import { Request, Response } from "express"
import { CustomError, JwtAdapter, handleError } from "../../config";
import { DataDnaDto, SaveDataDnaDto } from "../../validate-anomaly/domain/dtos";
import { ValidateAnomaly, SavePetitionAnomaly, GetStatsAnomaly } from "../../validate-anomaly/domain/usecase";
import { GetStatsAnomalyRepositoryImpl, SavePetitionAnomalyRepositoryImpl, ValidateAnomalyRepositoryImpl } from "../../validate-anomaly/infrastructure/repositories";

export class ValidateAnomalyController {

    constructor (
        private readonly validateAnomalyRepository: ValidateAnomalyRepositoryImpl,
        private readonly savePetitionAnomalyRepository:SavePetitionAnomalyRepositoryImpl,
        private readonly getStatsAnomalyRepository:GetStatsAnomalyRepositoryImpl,
    ) {}

    validate = (req:Request, res:Response) => {

        let datos:{
            jsonData:{
                dna:Array<Array<string>>;
                anomalia:string;
            }
        };

        const [error, dataDnaDto] = DataDnaDto.validate(req.body)
        if (error) {
            res.status(error.statuscode).json(error.message)
        }

        new ValidateAnomaly(this.validateAnomalyRepository).execute(dataDnaDto!)
        .then((resp) => {

            if (resp.resp.statuscode != 500) {

                if (resp.resp.statuscode == 200 || resp.resp.statuscode == 403) {

                    if (resp.resp.statuscode == 200){
                        datos = {
                            jsonData:{
                                dna:req.body.dna,
                                anomalia:"SI"
                            }
                        }
                    } else if (resp.resp.statuscode == 403) {
                        datos = {
                            jsonData:{
                                dna:req.body.dna,
                                anomalia:"NO"
                            }
                        }
                    }

                    const [error, saveDataDnaDto] = SaveDataDnaDto.save(datos)
                    if (error) {
                        res.status(error.statuscode).json(error.message)
                    }

                    new SavePetitionAnomaly(this.savePetitionAnomalyRepository).execute(saveDataDnaDto!)
                    .then((resp) => handleError(resp.resp, res))
                    .catch (error => handleError(error, res))

                } else {

                    handleError(resp.resp, res)
                }
            } else {
                handleError(resp.resp, res)
            }
            
        })
        .catch( error => handleError(error, res))
    }

    getStats = (req:Request, res:Response) => {

        new GetStatsAnomaly(this.getStatsAnomalyRepository).execute()
        .then((resp) => handleError(resp.resp, res))
        .catch (error => handleError(error, res))
    }
}