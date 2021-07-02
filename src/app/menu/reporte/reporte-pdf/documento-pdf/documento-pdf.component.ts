import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documento-pdf',
  templateUrl: './documento-pdf.component.html',
  styleUrls: ['./documento-pdf.component.css']
})
export class DocumentoPDFComponent implements OnInit {

  constructor(
    private reporte: ReporteService
  ) { }

  ngOnInit(): void {
  }

  descargar(){
    window.location.href="http://72.167.220.178/Prototipo/obtenerReportePDF"
    setTimeout( () => {
      Swal.fire({
        icon: 'success',
        title: '¡CORRECTO!',
        text: 'Se ha descargado el archivo'
      });
    },2300);
  }
}
