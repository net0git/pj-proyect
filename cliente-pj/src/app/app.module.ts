import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegadorComponent } from './componente/navegador/navegador.component';
import { PrincipalComponent } from './componente/principal/principal.component';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProduccionformComponent } from './componente/produccionform/produccionform.component';
import { ProduccionDetalleComponent } from './componente/produccion-detalle/produccion-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegadorComponent,
    PrincipalComponent,
    ProduccionformComponent,
    ProduccionDetalleComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
