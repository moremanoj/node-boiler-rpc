import bodyParser from 'body-parser';
import express from 'express';
import morgan from "morgan";
import helmet from 'helmet';
import { AppRoutes } from "./routes";
// import { config } from './config';
import { DatabaseService } from "./services/DatabaseService";

export class App {

    constructor() {
        this.router = new AppRoutes();
        this.express = express();
    }

    async initialize() {
        this.express.use(morgan('dev'))
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet());
        await DatabaseService.getConnection();
        this.router(this.express);
    }
}
