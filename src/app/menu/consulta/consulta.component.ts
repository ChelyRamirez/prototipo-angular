import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;


  constructor(
    
  ) { }

  ngOnInit(): void {
  }

  verClientes(){
 }
}
