import { CustomError, Validators } from "../../../config";

export class GetStatsResponseDto {

    private constructor(
        public jsonData:{
            count_anomalies:number;
            count_no_anomalies:number;
            ratio:string;
        }        
    ){}

    static validate (object: {[key: string]: any}):[CustomError?, GetStatsResponseDto?] {

        try {

            const {jsonData} = object;

            if (!jsonData) return [CustomError.bandRequest('El ADN es requerido'), undefined]

            return [
                undefined,
                new GetStatsResponseDto(
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