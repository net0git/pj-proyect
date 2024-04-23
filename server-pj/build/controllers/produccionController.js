"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
class ProduccionController {
    //ESTA FUNCION RECUPERA LA LISTA DETALLADA DE LA TABLA DE PRODUCCION
    listarProducciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT 
                                t_produccion.id_produccion,
                                t_dependencias.nombre_dependencia,
                                t_magistrados.nombre_magistrado,
                                t_produccion.anio,
                                t_produccion.mes,
                                t_produccion.matriz,
                                t_produccion.obs,
                                t_produccion.created

                            FROM 
                                t_produccion
                            JOIN 
                                t_dependencias ON t_produccion.id_dependencia = t_dependencias.id_dependencia
                            JOIN 
                                t_magistrados ON t_produccion.id_magistrado = t_magistrados.id_magistrado
                                
                         
            `;
                const producciones = yield database_1.default.query(consulta);
                res.json(producciones['rows']);
            }
            catch (error) {
                console.error('Error al obtener lista de producciones:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //ESTA FUNCION RECUPERA UNA PRODUCCION
    ObtenerProduccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_produccion } = req.params;
                const consulta = 'select * from t_produccion where id_produccion = $1';
                const certificado = yield database_1.default.query(consulta, [id_produccion]);
                if (certificado && certificado['rows'].length > 0) {
                    res.json(certificado['rows']);
                }
                else {
                    res.status(404).json({ text: 'El registro de Produccion no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener Registro de Produccion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //FUNCION PARA OBTENER UN REGISTRO POR dependencia , Magistrado , año y mes
    OptenerProduccionXdepMagAnioMes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dep, mag, anio, mes } = req.params;
                const consulta = ` 
                                SELECT 
                                    t_produccion.id_produccion,
                                    t_dependencias.nombre_dependencia,
                                    t_magistrados.nombre_magistrado,
                                    t_produccion.anio,
                                    t_produccion.mes,
                                    t_produccion.matriz,
                                    t_produccion.obs,
                                    t_produccion.created

                                FROM 
                                    t_produccion
                                JOIN 
                                    t_dependencias ON t_produccion.id_dependencia = t_dependencias.id_dependencia
                                JOIN 
                                    t_magistrados ON t_produccion.id_magistrado = t_magistrados.id_magistrado
                                    
                                WHERE t_dependencias.id_dependencia = $1
                                AND t_magistrados.id_magistrado = $2
                                AND t_produccion.anio=$3
                                AND t_produccion.mes = $4;
                             `;
                const produccion = yield database_1.default.query(consulta, [dep, mag, anio, mes]);
                res.json(produccion['rows']);
            }
            catch (error) {
                console.error('Error al obtener produccion por dependencia, magistrado, anio y mes:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //FUNCION PARA GUARDAR PRODUCCION
    // public async GuardarProduccion(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { id_dependencia, id_magistrado, anio, mes, matriz, obs} = req.body;
    //         const date = new Date();
    //         const consulta = `
    //             INSERT INTO t_produccion(
    //                 id_dependencia, id_magistrado, anio, mes, matriz, obs, created)
    //             VALUES ($1, $2, $3, $4, $5, $6, $7);
    //         `;
    //         const valores = [id_dependencia, id_magistrado, anio, mes, matriz, obs, date];
    //         // Envolver el código en una promesa
    //         const resultado = await new Promise((resolve, reject) => {
    //             db.query(consulta, valores, (error, resultado) => {
    //                 if (error) {
    //                     console.error('Error al insertar producción:', error);
    //                     reject(error);
    //                 } else {
    //                     console.log('Producción guardada correctamente');
    //                     resolve(resultado);
    //                 }
    //             });
    //         });
    //         res.json({ text: 'La producción se creó correctamente' });
    //     } catch (error) {
    //         console.error('Error al guardar producción:', error);
    //         res.status(500).json({ error: 'Error interno del servidor' });
    //     }
    // }
    GuardarProduccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_dependencia, id_magistrado, anio, mes, matriz, obs } = req.body;
                const date = new Date();
                const consulta = `

                    INSERT INTO t_produccion(id_dependencia, id_magistrado, anio, mes, matriz, obs, created)
                              VALUES ($1, $2, $3, $4, $5, $6, $7);
           
            `;
                const valores = [id_dependencia, id_magistrado, anio, mes, matriz, obs, date];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar produccion:', error);
                    }
                    else {
                        console.log('produccion guardada correctamente');
                        res.json({ text: 'la produccion se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al guardar produccion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //FUNCION PARA ELIMINAR UNA PRODUCCION
    EliminarProduccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_produccion } = req.params;
                const consulta = 'DELETE FROM t_produccion where id_produccion =$1';
                database_1.default.query(consulta, [id_produccion], (error, resultado) => {
                    if (error) {
                        console.error('Error al eliminar produccion:', error);
                    }
                    else {
                        console.log('produccion eliminado correctamente');
                        res.json({ text: 'la produccion se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al eliminar produccion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //FUNCION PARA MODIFICAR PRODUCCION 
    ModificarProduccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_produccion } = req.params;
                const { id_dependencia, id_magistrado, anio, mes, matriZ, obs } = req.body;
                const date = new Date();
                const consulta = `
                        UPDATE t_produccion
                        SET id_dependencia=$1, id_magistrado=$2, anio=$3, mes=$4, matriz=$5, obs=$6, created=$7
                        WHERE id_produccion=$8;
                `;
                const valores = [id_dependencia, id_magistrado, anio, mes, matriZ, obs, date, id_produccion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar produccion:', error);
                    }
                    else {
                        console.log('la produccion se ha modificado correctamente');
                        res.json({ text: 'produccion modificado correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar produccion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //====================================================CONSULTAS COMPLEMENTARIAS============================================================================    
    //OBTENER LISTA DE DEPENDENCIAS
    ObtenerDependencias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            
                                
                select * from t_dependencias      
                            
                `;
                const dependencias = yield database_1.default.query(consulta);
                res.json(dependencias['rows']);
            }
            catch (error) {
                console.error('Error al obtener lista de dependencias:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //OBTENER LISTA DE MAGISTRADOR
    ObtenerMagistrados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        
                            
                select * from t_magistrados      
                        
            `;
                const magistrados = yield database_1.default.query(consulta);
                res.json(magistrados['rows']);
            }
            catch (error) {
                console.error('Error al obtener lista de magistrados:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //LISTA DE FUNCIONES QUE PERTENECEN A UNA DEPENDENCIA
    ObtenerFuncionesXdependencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_dependencia } = req.params;
                const consulta = `
                        SELECT d.nombre_dependencia, f.nombre_funcion
                            FROM t_dependencias d
                            JOIN t_dependencia_funciones df ON d.id_dependencia = df.id_dependencia
                            JOIN t_funciones f ON df.id_funcion = f.id_funcion
                        WHERE d.id_dependencia = $1;   
                            
                `;
                const funciones = yield database_1.default.query(consulta, [id_dependencia]);
                if (funciones['rows'].length > 0) {
                    res.json(funciones['rows']);
                }
                else {
                    res.status(404).json({ text: 'las funciones no existen' });
                }
            }
            catch (error) {
                console.error('Error al obtener Registro de funciones:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const produccionController = new ProduccionController();
exports.default = produccionController;
