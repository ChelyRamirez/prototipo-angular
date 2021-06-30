import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { CargaComponent } from './carga/carga.component';
import { DocumentoXLSXComponent } from './menu/reporte/reporte-excel/documento-xlsx/documento-xlsx.component';
import { DocumentoPDFComponent } from './menu/reporte/reporte-pdf/documento-pdf/documento-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CargaComponent,
    DocumentoXLSXComponent,
    DocumentoPDFComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
