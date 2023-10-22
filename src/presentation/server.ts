import express, { Router } from "express";

interface Options {
    port?:number;
    routes:Router;
}

export class server {

    public readonly app = express();
    public readonly port: number;
    public readonly routes: Router;

    constructor( options: Options ){
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){

        //Define la utilizacion de json en la aplicacion
        this.app.use(express.json({limit: '100mb'}))
        //Define la utilizacion de x-www-form-urlencoded en la aplicacion
        this.app.use(express.urlencoded({extended: true, limit: '100mb'}))
        //Define la utilizacion de las rutas
        this.app.use(this.routes)
        //Se levanta el servidos escuchando por el puerto definido en la atributo this.port
        this.app.listen(this.port, () =>{
            console.log(`Sevidor inicializado en el puerto ${this.port}`)
        })
    }
}