import { DataDnaDatasource } from "../../domain/datasources";
import { DataDnaDto } from "../../domain/dtos";
import { DataDnaEntity } from "../../domain/entities";
import { ValidateAnomalyRepository } from "../../domain/repositories";


export class ValidateAnomalyRepositoryImpl implements ValidateAnomalyRepository {
    
    constructor (
        private readonly dataSource: DataDnaDatasource
    ){}
    
    validate(dataDnaDto: DataDnaDto): Promise<DataDnaEntity> {
        return this.dataSource.validate(dataDnaDto)
    }
    
}