import { CustomError } from "../../../config";
import { DataDnaDto } from "../dtos";
import { GetStatsAnomalyRepository, ValidateAnomalyRepository } from "../repositories";

interface ResponseValidate {
    resp:CustomError
}

interface GetStatsAnomalyUseCase {
    execute ( dataDnaDto: DataDnaDto): Promise <ResponseValidate>
}

export class GetStatsAnomaly implements GetStatsAnomalyUseCase {

    constructor (
        private readonly getStatsAnomalyRepository:GetStatsAnomalyRepository,
    ) {}


    async execute(): Promise<ResponseValidate> {

        const respValidation = await this.getStatsAnomalyRepository.getStats();

        if(!respValidation) throw CustomError.bandRequest('Error al consultar los datos de la base de datos')

        const {jsonData} = respValidation;

        return {
            resp:CustomError.successData("Estadisticas consultadas con exito",jsonData)
        }
    }
}