import express from "express";
import { getUsers, createUsers } from "./usersFacade";


export async function registerUserRoutes(app) {
    const router  = express.Router();
    router.get('/', getUsers);
    router.post('/add', createUsers);
    
    app.use('/users',router);  
}


