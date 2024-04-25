import { Router } from "express";
import produccionController from "../controllers/produccionController";


class ProduccionRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        
        this.router.get('/api/produccion',produccionController.listarProducciones)
        this.router.get('/api/produccion/:id_produccion',produccionController.ObtenerProduccion)
        this.router.get('/api/produccion/:dep/:mag/:anio/:mes',produccionController.OptenerProduccionXdepMagAnioMes)
        this.router.get('/api/produccion/lista/dependencias',produccionController.ObtenerDependencias)
        this.router.get('/api/produccion/lista/magistrados',produccionController.ObtenerMagistrados)
        this.router.get('/api/produccion/lista/funciones/:id_dependencia',produccionController.ObtenerFuncionesXdependencia)
        this.router.post('/api/produccion',produccionController.GuardarProduccion)
        this.router.put('/api/produccion/detalle/:id_produccion',produccionController.CambioDeEstadoProduccion)
        this.router.put('/api/produccion/:id_produccion',produccionController.ModificarProduccion)


        // this.router.get('/api', (req, res) => {
        //     res.send("hola neto al final te diste cuenta");

        // });
       
        console.log('hola desde el path')

    }
}

const produccionRoutes = new ProduccionRoutes
export default produccionRoutes.router;