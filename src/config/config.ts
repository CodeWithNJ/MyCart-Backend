import dotenv from 'dotenv'
import { Config } from '../interfaces/config.interface';

dotenv.config();

const config: Config = {
    port: Number(process.env.PORT) || 5500,
    nodeEnv: process.env.NODE_ENV || 'development'
}

export default config;