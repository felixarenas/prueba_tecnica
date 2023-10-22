import { CustomError, Validators } from "../../../config";

export class DataDnaDto {

    private constructor(
        public dna:Array<Array<string>>        
    ){}

    static validate (object: {[key: string]: any}):[CustomError?, DataDnaDto?] {

        try {

            const {dna} = object;

            if (!dna) return [CustomError.bandRequest('El ADN es requerido'), undefined]

            return [
                undefined,
                new DataDnaDto(
                    dna
                )
            ];
            
        } catch (error) {
            return [
                CustomError.bandRequest(`${error}`),
                undefined
            ];
        }   
    }
}