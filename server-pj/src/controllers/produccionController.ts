import { Request, Response, text } from 'express';
import db from '../database/database'; 

class ProduccionController{
    //ESTA FUNCION RECUPERA LA LISTA DETALLADA DE LA TABLA DE PRODUCCION
    public async listarProducciones(req:Request, res:Response):Promise<any>{
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
            const producciones=await db.query(consulta)
            res.json(producciones['rows']);
        } catch (error) {
            console.error('Error al obtener lista de producciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }


    //ESTA FUNCION RECUPERA UNA PRODUCCION
    public async ObtenerProduccion(req: Request, res: Response): Promise<void> {
        try {
            const { id_produccion } = req.params;
            const consulta= 'select * from t_produccion where id_produccion = $1';
            const certificado = await db.query(consulta,[id_produccion]);

            if (certificado && certificado['rows'].length > 0) {
                res.json(certificado['rows']);
            } else {
                res.status(404).json({ text: 'El registro de Produccion no existe' });
            }

        } catch (error) {
            console.error('Error al obtener Registro de Produccion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    //FUNCION PARA OBTENER UN REGISTRO POR dependencia , Magistrado , año y mes
    public async OptenerProduccionXdepMagAnioMes(req:Request, res:Response):Promise<any>{
        try {
            const { dep,mag,anio,mes } = req.params;
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
            const produccion=await db.query(consulta,[dep,mag,anio,mes ])
            res.json(produccion['rows']);
        } catch (error) {
            console.error('Error al obtener produccion por dependencia, magistrado, anio y mes:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
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
    public async GuardarProduccion(req: Request, res: Response): Promise<void> {
        try {
            
            const { id_dependencia, id_magistrado, anio, mes, matriz, obs} = req.body;
           const date= new Date();
           
            const consulta = `

                    INSERT INTO t_produccion(id_dependencia, id_magistrado, anio, mes, matriz, obs, created)
                              VALUES ($1, $2, $3, $4, $5, $6, $7);
           
            `;
            
            const valores = [id_dependencia, id_magistrado, anio, mes, matriz, obs, date];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar produccion:', error);
                } else {
                    console.log('produccion guardada correctamente');
                    res.json({ text: 'la produccion se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al guardar produccion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }

    //FUNCION PARA ELIMINAR UNA PRODUCCION
    public async EliminarProduccion(req:Request, res:Response):Promise<any>{
        try {
            const {id_produccion} =req.params;
            
            const consulta='DELETE FROM t_produccion where id_produccion =$1';

            db.query(consulta, [id_produccion], (error, resultado) => {
                if (error) {
                    console.error('Error al eliminar produccion:', error);
                } else {
                    console.log('produccion eliminado correctamente');
                    res.json({ text: 'la produccion se elimino correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al eliminar produccion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }
 
    //FUNCION PARA MODIFICAR PRODUCCION 
    public async ModificarProduccion(req: Request, res: Response): Promise<void> {
        try {
            const { id_produccion } = req.params;
            const { matriz, obs} = req.body;
            

            const consulta = `
                        UPDATE t_produccion
                        SET matriz=$1, obs=$2
                        WHERE id_produccion=$3;
                `;
            const valores = [matriz, obs, id_produccion];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar produccion:', error);
                } else {
                    console.log('la produccion se ha modificado correctamente');
                    res.json({ text: 'produccion modificado correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar produccion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

//====================================================CONSULTAS COMPLEMENTARIAS============================================================================    
       //OBTENER LISTA DE DEPENDENCIAS
        public async ObtenerDependencias(req:Request, res:Response):Promise<any>{
            try {
                const consulta = `
                            
                                
                select * from t_dependencias      
                            
                `;
                const dependencias=await db.query(consulta)
                res.json(dependencias['rows']);
            } catch (error) {
                console.error('Error al obtener lista de dependencias:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
            
        }

       //OBTENER LISTA DE MAGISTRADOR

       public async ObtenerMagistrados(req:Request, res:Response):Promise<any>{
        try {
            const consulta = `
                        
                            
                select * from t_magistrados      
                        
            `;
            const magistrados=await db.query(consulta)
            res.json(magistrados['rows']);
        } catch (error) {
            console.error('Error al obtener lista de magistrados:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

     //LISTA DE FUNCIONES QUE PERTENECEN A UNA DEPENDENCIA
     public async ObtenerFuncionesXdependencia(req: Request, res: Response): Promise<void> {
        try {


            const { id_dependencia } = req.params;

            const consulta = `
                        SELECT d.nombre_dependencia, f.nombre_funcion
                            FROM t_dependencias d
                            JOIN t_dependencia_funciones df ON d.id_dependencia = df.id_dependencia
                            JOIN t_funciones f ON df.id_funcion = f.id_funcion
                        WHERE d.id_dependencia = $1;   
                            
                `;
            const funciones = await db.query(consulta,[id_dependencia]);

            if (funciones['rows'].length > 0) {
                res.json(funciones['rows']);
            } else {
                res.status(404).json({ text: 'las funciones no existen' });
            }

        } catch (error) {
            console.error('Error al obtener Registro de funciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const produccionController = new ProduccionController();
export default produccionController;