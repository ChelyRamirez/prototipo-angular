import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { environment } from '../../../environments/environment';
declare var H: any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;
  
  constructor() { }

  ngOnInit(): void {
  }

}
