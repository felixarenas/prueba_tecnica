import { BcryptAdapter, CustomError } from "../../../config";
import { GetStatsModel, PetitionModel } from "../../data/postgres/models";
import { DataDnaDatasource } from "../../domain/datasources";
import { DataDnaDto, SaveDataDnaDto } from "../../domain/dtos";
import { ResponseEntity, DataDnaEntity, GetStatsResponseEntity } from "../../domain/entities";
import { DnaMapper } from "../mappers";

type HashFuntion = (password:string) => string;
type CompareFuntion = (password:string, hashed:string) => boolean;

export class validateAnomalyDataSourceImpl implements DataDnaDatasource {

    private Model!: PetitionModel;
    private getModel!: GetStatsModel;

    constructor(
        //private readonly hashPassword: HashFuntion = BcryptAdapter.hash,
        //private readonly ComparePassword: CompareFuntion = BcryptAdapter.compare,
    ){}


    async validate(dataDnaDto: DataDnaDto): Promise<DataDnaEntity> {
        
        try {

            return DnaMapper.dnaEntityFromObject(dataDnaDto);

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }

    async save(saveDataDnaDto: SaveDataDnaDto): Promise<ResponseEntity> {

        try {

            //Se invoca a la base de datos por medio del modelo
            this.Model = new PetitionModel(saveDataDnaDto);

            return DnaMapper.responseEntityFromObject(await this.Model.save());
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }

    async getStats():Promise<GetStatsResponseEntity> {
        try {

            //Se invoca a la base de datos por medio del modelo
            this.getModel = new GetStatsModel();

            return DnaMapper.getResponseEntityFromObject(await this.getModel.get());

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }
}