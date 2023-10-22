import { Pool, Client } from "pg"
import { CustomError } from "./custom.error";
import { envs } from "./envs"

interface Options {
    dbType:string;
}

async function PostgresDataBaseAdapter(options: Options):Promise<Client|Pool|CustomError> {

	const { dbType } = options

    try {


        if (dbType == 'Client') {

            const client = new Client({
                host: envs.DB_HOST,
                database: envs.DB_DATABASE,
                user: envs.DB_USER,
                password: envs.DB_PASSWORD,
                port:envs.DB_PORT
            });
    
            await client.connect();

            return client;

        } else if ( dbType =='Pool') {

            const pool = new Pool({
                host: envs.DB_HOST,
                database: envs.DB_DATABASE,
                user: envs.DB_USER,
                password: envs.DB_PASSWORD,
                port:envs.DB_PORT
            });
    
            await pool.connect();
            
            return pool;
        } else {
            return CustomError.unAuthorized('No se pudo conectar a la base de datos')
        }
    } catch (error) {

        throw error;
    }
}

module.exports = {
    PostgresDataBaseAdapter
}