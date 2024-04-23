import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componente/principal/principal.component';
import { ProduccionformComponent } from './componente/produccionform/produccionform.component';
import { ProduccionDetalleComponent } from './componente/produccion-detalle/produccion-detalle.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/principal',
    pathMatch:'full'
  },
  {
    path:'principal',
    component:PrincipalComponent
  },
  {
    path:'principal/detalle/:id',
    component:ProduccionDetalleComponent
  },
  {
    path:'principal/newproduccion',
    component:ProduccionformComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
