import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
=======
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
>>>>>>> a1e05cdcffc0dc0be26b78305b1377c6fa06335e
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
    GlobalService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }