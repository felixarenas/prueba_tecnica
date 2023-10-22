import { DataDnaDto } from "../dtos";
import { DataDnaEntity } from "../entities";


export abstract class ValidateAnomalyRepository {
    abstract validate(dataDnaDto: DataDnaDto):Promise<DataDnaEntity>
}