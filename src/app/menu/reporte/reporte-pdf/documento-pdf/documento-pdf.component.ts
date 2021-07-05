import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Bitacora } from '../../../../models/bitacora';
import { User } from '../../../../models/empleado';

@Component({
  selector: 'app-documento-pdf',
  templateUrl: './documento-pdf.component.html',
  styleUrls: ['./documento-pdf.component.css']
})
export class DocumentoPDFComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;
  bit: Bitacora = {
    modulo: 'Reporte',
    accion: 'Creo un archivo PDF',
    idEmpleado: 0
  }
  log: User = JSON.parse(localStorage.getItem('usuario'));

  constructor(
    private reporte: ReporteService,
    private bitacora: GlobalService
  ) { }

  ngOnInit(): void {
  }

  descargar(){
    this.bit.idEmpleado = this.log.idEmpleado;
    this.bitacora.registrarBitacora(this.bit).subscribe(
      res => {
        return console.log(res);
      },
      err => { return console.log(err)}
    )

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
