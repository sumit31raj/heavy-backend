import { ConnectionOptions, createConnection } from "typeorm";
import { Hash } from "./entity/hash.entity";
import dotenv from "dotenv";
import { ConfigService } from "@nestjs/config";

dotenv.config();

const {
  DB_CONNECTION,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;

export const initializeDatabase = async () => {
  const configService = new ConfigService();
  return await createConnection({
    type: DB_CONNECTION,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [Hash],
    synchronize: true,
  } as ConnectionOptions);
};
