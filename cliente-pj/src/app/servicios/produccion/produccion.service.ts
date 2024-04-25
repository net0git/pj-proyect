import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {
  api_produccion='http://localhost:4000/api/produccion';

  constructor(private http:HttpClient) { }

  ObtenerListaProcesos(){
    return this.http.get(this.api_produccion)
  }

  ObtenerListaDepencias(){
    return this.http.get(this.api_produccion+'/lista/dependencias')
  }

  ObtenerListaMagistrados(){
    return this.http.get(this.api_produccion+'/lista/magistrados')
  }

  ObtenerFuncionesXdependencia(id_funcion:any){
    return this.http.get(this.api_produccion+'/lista/funciones/'+id_funcion)
  }

  //guardar proceso
  GuardarProduccion(body:any){
    return this.http.post(this.api_produccion,body)
  }

  //obtener detalle de una produccion
  ObtenerProduccionXid(id_produccion:any){
    return this.http.get(this.api_produccion+'/'+id_produccion)
  }

  //modificar produccion
  ModificarProduccionXid(id_produccion:any,body:any){
    return this.http.put(this.api_produccion+'/'+id_produccion,body)
  }

  //modificar estado de la produccion
  ModificarEstadoProduccion(id_produccion:number,estado:any){
    return this.http.put(this.api_produccion+'/detalle/'+id_produccion,estado)
  }
}
