/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * File: for db connection
 * created: [2024-01-05]
 * Project: Oss
 */

import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { entities } from "../entityManager";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: String(process.env.PRO_DB_HOST),
  port: Number(process.env.PRO_DB_PORT),
  username: process.env.PRO_DB_USERNAME,
  password: process.env.PRO_DB_PASSWORD,
  database: process.env.PRO_DB_DATABASE,
  entities: entities(),
  logging: false,
  synchronize: false,
  options: {
    encrypt: true, // Trust self-signed certificates
    trustServerCertificate: true // trust self-signed certificate
  },
  extra: {
    connectionTimeout: 30000, // Timeout in ms before a connection is considered failed
    requestTimeout: 30000,    // Timeout in ms before a query is considered failed
    pool: {
      max: 10,       // Maximum number of connections in pool
      min: 2,        // Minimum number of connections in pool
      idleTimeoutMillis: 30000, // Time after which an idle connection will be released
    }
  },

});




