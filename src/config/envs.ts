import * as dotenv from 'dotenv';
dotenv.config({path:`${__dirname}/../.env`});
import { from, logger } from 'env-var'

const env = from(process.env, {}, logger)

export const envs = {
    SERVER_PORT: env.get('SERVER_PORT').default('3001').asPortNumber(),
    DB_HOST: env.get('DB_HOST').default('87.106.136.19').asString(),
    DB_DATABASE: env.get('DB_DATABASE').default('pruebatecnica').asString(),
    DB_USER: env.get('DB_USER').default('pruebatecnica').asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').default('pru3b4').asString(),
    DB_PORT: env.get('DB_PORT').default('5432').asPortNumber()
}