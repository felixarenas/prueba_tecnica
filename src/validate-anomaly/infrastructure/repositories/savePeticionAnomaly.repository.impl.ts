import { DataDnaDatasource } from "../../domain/datasources";
import { SaveDataDnaDto } from "../../domain/dtos";
import { ResponseEntity } from "../../domain/entities";
import { SavePetitionAnomalyRepository } from "../../domain/repositories";


export class SavePetitionAnomalyRepositoryImpl implements SavePetitionAnomalyRepository {
    
    constructor (
        private readonly dataSource: DataDnaDatasource
    ){}
    
    validate(saveDataDnaDto: SaveDataDnaDto): Promise<ResponseEntity> {
        return this.dataSource.save(saveDataDnaDto)
    }
    
}