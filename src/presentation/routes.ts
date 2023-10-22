import { Router } from "express";
import { validateAnomalyRouter } from "./validate-anomaly/validateAnomaly";


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1', validateAnomalyRouter.routes);

        return router;
    }

}