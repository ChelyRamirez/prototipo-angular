import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { AprobacionComponent } from './aprobacion/aprobacion.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ReporteComponent } from './reporte/reporte.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReportePDFComponent } from './reporte/reporte-pdf/reporte-pdf.component';
import { ReporteExcelComponent } from './reporte/reporte-excel/reporte-excel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './inicio/menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { HereMapComponent } from './solicitud/here-map/here-map.component';
import { AppRoutingModule } from '../app-routing.module';
import { FilterPipe, FilterPipeB } from '../pipes/filter.pipe';



@NgModule({
  declarations: [
    MenuComponent,
    SolicitudComponent,
    AsignacionComponent,
    AprobacionComponent,
    UsuarioComponent,
    ConsultaComponent,
    ReporteComponent,
    BitacoraComponent,
    PerfilComponent,
    ReportePDFComponent,
    ReporteExcelComponent,
    HereMapComponent,
    FilterPipe,
    FilterPipeB
  ],
  exports: [],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ]
})
export class MenuModule { }
