/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * File: main file of project
 * created: [2024-01-05]
 * Project: Oss
 */
import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from "fs";
import cors from "cors";
import { AppDataSource } from './db/config';
import Logger from './loggers/winstonLogger';
import compression from "compression";
//controllers
import { adminRouter, userRouter } from "./apiController";

// for accessing env variables
dotenv.config();

// express adding sever to app
const app = express();

// setting port num from env
const port: any = process.env.PORT || 3000;

// using for body parsers
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(compression()); // for response in low sizes

// cors setup for communication of sever and client
app.use(cors());

//setting req headers and res headers 
app.use(function (req, res, next) {
  res.header("X-Frame-Options", "SAMEORIGIN");
  res.header("X-XSS-Protection", "1; mode=block'");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("strict-transport-security", "max-age=63072000; includeSubdomains; preload");
  res.header('Content-Security-Policy', '<policy-directive>; <policy-directive>')
  next();
});

// create for logs śad
app.use(morgan('common', {
  stream: fs.createWriteStream('./logs/application.log', { flags: 'a' })
}));

app.use(morgan('dev'));
  
  app.get("/mapi/run", (req, res) => {
    res.send("running")
  })
  
  // controllers
  app.use('/mapi/user', userRouter);
  app.use('/mapi/admin', adminRouter);
  
  // db initialization while running the server 
  AppDataSource.initialize().then(async (connection) => {
    app.listen(port, () => {
      Logger.info(`⚡️[Database]: Database connected....+++++++ ${port}`);
    });
  }).catch(error => {
    Logger.error("connection error :::::::", error);
    throw new Error("new Connection ERROR " + JSON.stringify(error));
  })


