"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produccionController_1 = __importDefault(require("../controllers/produccionController"));
class ProduccionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/produccion', produccionController_1.default.listarProducciones);
        this.router.get('/api/produccion/:id_produccion', produccionController_1.default.ObtenerProduccion);
        this.router.get('/api/produccion/:dep/:mag/:anio/:mes', produccionController_1.default.OptenerProduccionXdepMagAnioMes);
        this.router.get('/api/produccion/lista/dependencias', produccionController_1.default.ObtenerDependencias);
        this.router.get('/api/produccion/lista/magistrados', produccionController_1.default.ObtenerMagistrados);
        this.router.get('/api/produccion/lista/funciones/:id_dependencia', produccionController_1.default.ObtenerFuncionesXdependencia);
        this.router.post('/api/produccion', produccionController_1.default.GuardarProduccion);
        this.router.put('/api/produccion/detalle/:id_produccion', produccionController_1.default.CambioDeEstadoProduccion);
        this.router.put('/api/produccion/:id_produccion', produccionController_1.default.ModificarProduccion);
        // this.router.get('/api', (req, res) => {
        //     res.send("hola neto al final te diste cuenta");
        // });
        console.log('hola desde el path');
    }
}
const produccionRoutes = new ProduccionRoutes;
exports.default = produccionRoutes.router;
