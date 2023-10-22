import { CustomError } from "../../../config";
import { SaveDataDnaDto } from "../dtos";
import { SavePetitionAnomalyRepository } from "../repositories";

interface ResponseValidate {
    resp:CustomError
}

interface SavePetitionAnomalyUseCase {
    execute ( saveDataDnaDto: SaveDataDnaDto): Promise <ResponseValidate>
}

export class SavePetitionAnomaly implements SavePetitionAnomalyUseCase {


    constructor (
        private readonly savePetitionAnomalyRepository:SavePetitionAnomalyRepository,
    ) {}

    async execute(saveDataDnaDto: SaveDataDnaDto): Promise<ResponseValidate> {

        const respValidation = await this.savePetitionAnomalyRepository.validate(saveDataDnaDto);

        if(!respValidation) throw CustomError.forbidden('Error al procesar los datos frente a la base de datos')

        const { jsonData } = respValidation;

        if (jsonData.anomaly == 1) {
            return {
                resp:CustomError.success("Se encontro una anomalia en el ADN ingresado")
            } 
        } else if (jsonData.anomaly == 0) {
            return {
                resp:CustomError.forbidden("No se encontro ninguna anomalia en el ADN ingresado")
            }
        }

        return {
            resp:CustomError.bandRequest("Error no identificado en el caso de uso")
        }
    }
}