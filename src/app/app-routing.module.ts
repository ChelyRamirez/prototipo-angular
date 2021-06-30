import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaComponent } from './carga/carga.component';
import { LoginComponent } from './login/login.component';
import { AprobacionComponent } from './menu/aprobacion/aprobacion.component';
import { AsignacionComponent } from './menu/asignacion/asignacion.component';
import { BitacoraComponent } from './menu/bitacora/bitacora.component';
import { ConsultaComponent } from './menu/consulta/consulta.component';
import { MenuComponent } from './menu/inicio/menu.component';
import { PerfilComponent } from './menu/perfil/perfil.component';
import { DocumentoXLSXComponent } from './menu/reporte/reporte-excel/documento-xlsx/documento-xlsx.component';
import { ReporteExcelComponent } from './menu/reporte/reporte-excel/reporte-excel.component';
import { DocumentoPDFComponent } from './menu/reporte/reporte-pdf/documento-pdf/documento-pdf.component';
import { ReportePDFComponent } from './menu/reporte/reporte-pdf/reporte-pdf.component';
import { ReporteComponent } from './menu/reporte/reporte.component';
import { SolicitudComponent } from './menu/solicitud/solicitud.component';
import { UsuarioComponent } from './menu/usuario/usuario.component';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: CargaComponent},
  {path: "login", component: LoginComponent},
  {path: "menu", component: MenuComponent},
  {path: "solicitudCredito", component: SolicitudComponent},
  {path: "asignarVisita", component: AsignacionComponent},
  {path: "aprobarCredito", component: AprobacionComponent},
  {path: "usuario", component: UsuarioComponent},
  {path: "consulta", component: ConsultaComponent},
  {path: "bitacora", component: BitacoraComponent},
  {path: "reportes", component: ReporteComponent},
  {path: "perfil", component: PerfilComponent},
  {path: "reportePDF", component: ReportePDFComponent},
  {path: "reporteExcel", component: ReporteExcelComponent},
  {path: "documentoExcel", component: DocumentoXLSXComponent},
  {path: "documentoPDF", component: DocumentoPDFComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
