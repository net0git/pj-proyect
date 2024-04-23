import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProduccionService } from '../../servicios/produccion/produccion.service';


@Component({
  selector: 'app-produccion-detalle',
  templateUrl: './produccion-detalle.component.html',
  styleUrl: './produccion-detalle.component.css'
})
export class ProduccionDetalleComponent implements OnInit{


  constructor(private activatedRoute:ActivatedRoute, private produccionService:ProduccionService){}

  dataProduccion:any=[]//variable en donde se almacenara la informacion de los datos de produccion

  dataValoresProduccion:any=[]
  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params;
    if(params['id']){
      console.log(params['id'])
    
      this.produccionService.ObtenerProduccionXid(params['id']).subscribe(
        res=>{
            this.dataProduccion=res
            this.dataProduccion=this.dataProduccion[0]
            console.log(this.dataProduccion)
            this.dataValoresProduccion = JSON.parse(this.dataProduccion.matriz);
        },
        err=>{
            console.error(err)
        }
      )
      // this.empresaServicioService.ObtenerEmpresaServicio(params['id']).subscribe(
      //   res=>{
      //     this.data_empresa_servicio=res
      //     this.data_empresa_servicio=this.data_empresa_servicio[0]
      //     this.data_empresa_servicio.fecha_inicial=this.FechaConFormato(this.data_empresa_servicio.fecha_inicial)
      //     this.ObtenerDatosEmpresa(this.data_empresa_servicio.id_empresa);
          
      //     console.log(this.data_empresa_servicio)
      //   },
      //   err=>{
      //     console.error(err)
      //  }
      //)
      
  }
  }

}
