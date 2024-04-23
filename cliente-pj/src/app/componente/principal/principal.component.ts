import { Component, OnInit } from '@angular/core';
import { ProduccionService } from '../../servicios/produccion/produccion.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit{

constructor( private produccionService:ProduccionService, private router:Router){

}

producciones:any=[];

 ngOnInit(): void {
  this.ListarProduccion();
 }
ListarProduccion(){
    this.produccionService.ObtenerListaProcesos().subscribe(
      res=>{
            this.producciones=res
            console.log(this.producciones)
      },
      err=>{
            console.error(err)
      }
    )
}


entrarDetalle(id:number){
  this.router.navigate(['principal/detalle',id])
}
newProduccion(){
  
  this.router.navigate(['principal/newproduccion'])
}

  
}
