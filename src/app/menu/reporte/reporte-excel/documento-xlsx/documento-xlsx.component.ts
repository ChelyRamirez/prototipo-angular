import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { ReporteService } from 'src/app/services/reporte.service';
import Swal from 'sweetalert2';
import { Bitacora } from '../../../../models/bitacora';
import { User } from '../../../../models/empleado';

@Component({
  selector: 'app-documento-xlsx',
  templateUrl: './documento-xlsx.component.html',
  styleUrls: ['./documento-xlsx.component.css']
})
export class DocumentoXLSXComponent implements OnInit {
  bit: Bitacora = {
    modulo: 'Reporte',
    accion: 'Creo un archivo XLSX',
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
        console.log(res);
      },
      err => console.log(err)
    )
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
