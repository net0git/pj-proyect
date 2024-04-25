import { Component, OnInit } from '@angular/core';
import { ProduccionService } from '../../servicios/produccion/produccion.service';


@Component({
  selector: 'app-produccionform',
  templateUrl: './produccionform.component.html',
  styleUrl: './produccionform.component.css'
})
export class ProduccionformComponent implements OnInit {

  listaDependencias:any=[]//todas las dependencias que tenemos registrados
  listaMagistrados:any=[]//lista de todos los magistrados
  listaFunciones:any=[]//lista de funciones

  valoresEntrada: any[] = []; // Array para almacenar los valores de entrada

//id_dependencia, id_magistrado, anio, mes, matriz, obs
  //datos para guardar
  datos:any={
    id_dependencia:0,
    id_magistrado:0,
    anio:'',
    mes:'',
    matriz:'',
    obs:''
  }

constructor(private produccionService:ProduccionService){
 
  //  this.valoresEntrada = [
  //   { valor1: 23, valor2: 5, valor3: 6, valor4: 2, valor5: 6 }, // Ejemplo de valores iniciales
  //   { valor1: 67, valor2: 16, valor3: 5, valor4: 0, valor5: 9 },
  //   { valor1: 13, valor2: 16, valor3: 78, valor4: 45, valor5: 23 },
  // ];
// console.log(this.valoresEntrada[0].valor1)
 
}

// Inicializar valoresEntrada con la misma longitud que listaFunciones
  ngOnInit(): void {
    this.listarDependencias();
    this.ListaMagistrados();

      
  }
  getRandomNumber(): number {
    // Generar un número aleatorio entre 0 y 100 (puedes ajustar según tus necesidades)
    return Math.floor(Math.random() * 101);
  }
  listarDependencias(){
    this.produccionService.ObtenerListaDepencias().subscribe(
      res=>{
        this.listaDependencias=res
        console.log(this.listaDependencias)
      },
      err=>{
        console.error(err)
      }
    )
  }

  ListaMagistrados(){
    this.produccionService.ObtenerListaMagistrados().subscribe(
      res=>{
        this.listaMagistrados=res
      },
      err=>{
        console.error(err)
      }
    )
  }

  onDependenciaSeleccionada(){
    let id_dependencia = (<HTMLInputElement>document.getElementById('selectdependencia')).value;

    this.produccionService.ObtenerFuncionesXdependencia(id_dependencia).subscribe(
      res=>{
          this.listaFunciones=res
          this.mostrarValores()
          console.log(this.listaFunciones)
      },
      err=>{
        console.error(err)
      }
    )
  }

 
  mostrarValores(){
   
    for (let i = 0; i < this.listaFunciones.length; i++) {
      this.valoresEntrada.push({
        funcion:this.listaFunciones[i].nombre_funcion,
        valor1: this.getRandomNumber(),
        valor2: this.getRandomNumber(),
        valor3: this.getRandomNumber(),
        valor4: this.getRandomNumber(),
        valor5: this.getRandomNumber(),
      });
    }
    console.log(this.valoresEntrada)
   // console.log("el valor encontrado ="+this.valoresEntrada[0])
  }

  obtenerValoresJson(){
    const valoresEntradaJSON = JSON.stringify(this.valoresEntrada);
    console.log(valoresEntradaJSON);
  }

  GuardarDatos(){
    let id_dependencia = (<HTMLInputElement>document.getElementById('selectdependencia')).value;
    let id_magistrado = (<HTMLInputElement>document.getElementById('selectmagistrado')).value;
    let anio = (<HTMLInputElement>document.getElementById('anio')).value;
    let mes = (<HTMLInputElement>document.getElementById('mes')).value;
    let obs = (<HTMLInputElement>document.getElementById('exampleFormControlTextareaObser')).value;
    const valoresEntradaJSON = JSON.stringify(this.valoresEntrada);

    this.datos.id_dependencia=id_dependencia;
    this.datos.id_magistrado=id_magistrado;
    this.datos.anio=anio
    this.datos.mes=mes
    this.datos.matriz=valoresEntradaJSON;
    this.datos.obs=obs

   console.log(this.datos)

    this.produccionService.GuardarProduccion(this.datos).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.error(err)
      }
    )
  }
 
}
