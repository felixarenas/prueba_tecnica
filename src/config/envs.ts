import * as dotenv from 'dotenv';
dotenv.config({path:`${__dirname}/../.env`});
import { from, logger } from 'env-var'

const env = from(process.env, {}, logger)

export const envs = {
    SERVER_PORT: env.get('SERVER_PORT').default('3000').asPortNumber(),
    DB_HOST: env.get('DB_HOST').default('127.0.0.1').asString(),
    DB_DATABASE: env.get('DB_DATABASE').default('desamovit').asString(),
    DB_USER: env.get('DB_USER').default('desamovit').asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').default('d3s4m0v1t.*').asString(),
    DB_PORT: env.get('DB_PORT').default('5432').asPortNumber()
}