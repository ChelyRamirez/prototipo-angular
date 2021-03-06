import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reporte-excel',
  templateUrl: './reporte-excel.component.html',
  styleUrls: ['./reporte-excel.component.css']
})
export class ReporteExcelComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;
  constructor(
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.verificarConexion().subscribe(
        res => {
         return this.router.navigate(['/documentoExcel']);
        },
         err => console.log(err)
      );
    }, 2800);
  }

}
