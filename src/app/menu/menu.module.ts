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
import { RouterLink } from '@angular/router';
import { ReportePDFComponent } from './reporte/reporte-pdf/reporte-pdf.component';
import { ReporteExcelComponent } from './reporte/reporte-excel/reporte-excel.component';
import { MenuComponent } from './menu.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SolicitudComponent, 
    AsignacionComponent, 
    AprobacionComponent, 
    UsuarioComponent, 
    ConsultaComponent, 
    ReporteComponent, 
    BitacoraComponent, 
    PerfilComponent, 
    ReportePDFComponent, 
    ReporteExcelComponent],
  exports: [
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

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink
  ]
})
export class MenuModule { }
