import Server from './server'
import {API} from "./routes/api";
import { PORT,PUBLICFILES } from './env';
import { configMiddleware } from './config/middleware'
import express from 'express';


const server = Server.instance;
const app = server.aplication

/*CONFIG MIDDLEWARES*/
configMiddleware(app)

//Rutas
app.use(API);

//static file

app.use(express.static(PUBLICFILES));


/*FIN DE MIDDLEWARE*/


//startAplication
server.start(() => {
    console.log(`Servidor corriendo ${PORT}`)
});