import { SaveDataDnaDto } from "../dtos";
import { ResponseEntity } from "../entities";


export abstract class SavePetitionAnomalyRepository {
    abstract validate(saveDataDnaDto: SaveDataDnaDto):Promise<ResponseEntity>
}