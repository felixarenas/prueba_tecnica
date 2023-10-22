import { CustomError, Validators } from "../../../config";

export class SaveDataDnaDto {

    private constructor(
        public jsonData:{
            dna:Array<Array<string>>;
            anomalia:string;
        }
    ){}

    static save(object: {[key: string]: any}):[CustomError?, SaveDataDnaDto?]{

        try {

            const { jsonData } = object;

            if (!jsonData) return [CustomError.bandRequest('El Json ingresado no es valido'), undefined]
            
            return [
                undefined,
                new SaveDataDnaDto(
                    jsonData
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