import { DataDnaDto, SaveDataDnaDto, GetStatsResponseDto } from "../dtos";
import { DataDnaEntity, GetStatsResponseEntity, ResponseEntity } from "../entities";

export abstract class DataDnaDatasource {

    abstract validate(dataDnaDto: DataDnaDto):Promise<DataDnaEntity>

    abstract save(saveDataDnaDto: SaveDataDnaDto):Promise<ResponseEntity>

    abstract getStats():Promise<GetStatsResponseDto>
}