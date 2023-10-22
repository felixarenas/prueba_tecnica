import { DataDnaDto } from "../dtos";
import { DataDnaEntity, GetStatsResponseEntity } from "../entities";


export abstract class GetStatsAnomalyRepository {
    abstract getStats():Promise<GetStatsResponseEntity>
}