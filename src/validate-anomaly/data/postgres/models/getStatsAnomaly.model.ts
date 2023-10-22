import { envs } from "../../../../config";
const { PostgresDataBaseAdapter } = require("../../../../config/postgres-database")

interface JsonResp {
    jsonData:{
        count_anomalies:number|undefined;
        count_no_anomalies:number|undefined;
        ratio:string|undefined;
    }
}

export class GetStatsModel {

    public readonly jsonData:any

    constructor(){}

    async get():Promise<JsonResp> {

        try {

            const Client = await PostgresDataBaseAdapter({
                dbType: "Client"
            });

            let sql:string = `
            select (SELECT count (id) as count_anomalies
            FROM public.petition_validate_anomaly a
            where a.status_validation = 1) as count_anomalies,
            (SELECT count (id) as count_no_anomalies
            FROM public.petition_validate_anomaly a
            where a.status_validation = 0) as count_no_anomalies,
            round((SELECT sum(a.status_validation)
                            FROM public.petition_validate_anomaly a
                            where a.status_validation = 1)::numeric / 
            (SELECT count(a.status_validation)
                FROM public.petition_validate_anomaly a)::numeric,2) as ratio
            `

            const resp = await Client.query(sql);

            return {
                jsonData:{
                    count_anomalies:resp.rows[0].count_anomalies,
                    count_no_anomalies:resp.rows[0].count_no_anomalies,
                    ratio:resp.rows[0].ratio
                }
            }            
        } catch (error) {

            return {
                jsonData:{
                    count_anomalies:undefined,
                    count_no_anomalies:undefined,
                    ratio:`${error}`
                }
            }
        }
    }
}