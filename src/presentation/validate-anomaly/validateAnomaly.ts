import { Router } from "express";
import { ValidateAnomalyController } from "./controller"
import { ValidateAnomalyRepositoryImpl,SavePetitionAnomalyRepositoryImpl, GetStatsAnomalyRepositoryImpl } from "../../validate-anomaly/infrastructure/repositories";
import { validateAnomalyDataSourceImpl } from "../../validate-anomaly/infrastructure/datasources";

export class validateAnomalyRouter {

    static get routes(): Router {
        const dataSource = new validateAnomalyDataSourceImpl;
        const validateAnonalyRepository = new ValidateAnomalyRepositoryImpl(dataSource);
        const savePetitionAnomalyRepository = new SavePetitionAnomalyRepositoryImpl(dataSource);
        const getStatsAnomalyRepository = new GetStatsAnomalyRepositoryImpl(dataSource);

        const router = Router();
        const controller = new ValidateAnomalyController(
            validateAnonalyRepository,
            savePetitionAnomalyRepository,
            getStatsAnomalyRepository
        );

        router.post('/validate-anomaly', controller.validate);

        router.get('/stats', controller.getStats)

        return router;
    }

}