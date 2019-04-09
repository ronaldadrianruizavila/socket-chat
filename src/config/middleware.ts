import { Application } from "express";
import morgan from 'morgan';
import { json, urlencoded } from 'express';
import cors from 'cors'

export const configMiddleware = (app: Application) => {
    //reviso de peticiones
    app.use(morgan('dev'));

    //aceptar cors
    app.use(cors());

    //acceptar JSON
    app.use(urlencoded({ extended: true }));
    app.use(json());
}
