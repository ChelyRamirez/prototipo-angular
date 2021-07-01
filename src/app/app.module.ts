import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CargaComponent } from './carga/carga.component';
import { DocumentoXLSXComponent } from './menu/reporte/reporte-excel/documento-xlsx/documento-xlsx.component';
import { DocumentoPDFComponent } from './menu/reporte/reporte-pdf/documento-pdf/documento-pdf.component';
import { LoginService } from './services/login.service';
import { GlobalService } from './services/global.service';
import { MenuModule } from './menu/menu.module';
import { HereMapsModule } from 'ng2-heremaps';
import { ReporteService } from './services/reporte.service';
import { ClienteService } from './services/cliente.service';

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
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MenuModule,
    HereMapsModule.forRoot({
    apiKey: 'Ib2YJfQW-Ak3OnSVB5943IkDnFavxZKnbv6euTs6Mz8',
    appId: '3RezJgPr8UGLslM3w4KZ',
    apiVersion: '3.0',
    libraries: ['core', 'service']
    })
  ],
  providers: [
    LoginService,
    GlobalService,
    ReporteService,
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }