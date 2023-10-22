import { envs } from "../../../../config";
const { PostgresDataBaseAdapter } = require("../../../../config/postgres-database")

interface JsonData {
    jsonData:{
        dna:Array<Array<string>>;
        anomalia:string;
    }
}

interface JsonResp {
    jsonData:{
        id: number|undefined;
        anomaly:number|undefined;
    }
}

export class PetitionModel {

    public readonly jsonData:any

    constructor(
        object: JsonData
    ){
        const { jsonData } = object;
        
        this.jsonData = jsonData;
    }

    async save():Promise<JsonResp> {

        try {

            const Client = await PostgresDataBaseAdapter({
                dbType: "Client"
            });
    
            let anomaly:number = 0;
    
            if (this.jsonData.anomalia == 'SI') {
                anomaly = 1;
            }
    
            let sql:string = `
            INSERT INTO public.petition_validate_anomaly(json_petition, status_validation)
            VALUES($1, $2) RETURNING id
            `
    
            const resp = await Client.query(sql,[
                this.jsonData.dna,
                anomaly,
            ]);

            return {
                jsonData:{
                    id: resp.rows[0].id,
                    anomaly:anomaly
                }
            }            
        } catch (error) {
            
            return {
                jsonData:{
                    id:undefined,
                    anomaly:undefined
                }
            }
        }
    }
}