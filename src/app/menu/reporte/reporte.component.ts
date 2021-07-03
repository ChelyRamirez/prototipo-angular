import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;
  constructor() { }

  ngOnInit(): void {
  }
}
