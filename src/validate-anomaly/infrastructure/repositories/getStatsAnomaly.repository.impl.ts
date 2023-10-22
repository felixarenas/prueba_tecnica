import { DataDnaDatasource } from "../../domain/datasources";
import { GetStatsResponseEntity } from "../../domain/entities";
import { GetStatsAnomalyRepository } from "../../domain/repositories";


export class GetStatsAnomalyRepositoryImpl implements GetStatsAnomalyRepository {
    
    constructor (
        private readonly dataSource: DataDnaDatasource
    ){}
    
    getStats(): Promise<GetStatsResponseEntity> {
        return this.dataSource.getStats()
    } 
}