import { CustomError } from "../../../config";
import { DataDnaEntity, GetStatsResponseEntity, ResponseEntity } from "../../domain/entities";


export class DnaMapper {

    static dnaEntityFromObject(object: {[key:string]:any}) {

        const {dna} = object;
        
        if (!dna) throw CustomError.bandRequest('El ADN no esta definido');

        return new DataDnaEntity(
            dna
        );
    }

    static responseEntityFromObject(object: {[key:string]:any}) {

        const {jsonData} = object;

        if (!jsonData) throw CustomError.bandRequest('El objeto Response no ha sido definido');

        return new ResponseEntity(
            jsonData
        );
    }

    static getResponseEntityFromObject(object: {[key:string]:any}) {

        const {jsonData} = object;

        if (!jsonData) throw CustomError.bandRequest('El objeto Response no ha sido definido');

        return new GetStatsResponseEntity(
            jsonData
        );
    }
}