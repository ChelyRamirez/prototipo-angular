import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documento-xlsx',
  templateUrl: './documento-xlsx.component.html',
  styleUrls: ['./documento-xlsx.component.css']
})
export class DocumentoXLSXComponent implements OnInit {

  constructor(
    private reporte: ReporteService
  ) { }

  ngOnInit(): void {
    
  }

  descargar(){
    
    setTimeout( () => {
      window.location.href="http://72.167.220.178/Prototipo/obtenerReporteExcel"
      Swal.fire({
        icon: 'success',
        title: '¡CORRECTO!',
        text: 'Se ha descargado el archivo'
      });
    },10);
  }
}
