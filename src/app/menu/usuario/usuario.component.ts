import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public rutaIMG = environment.RUTA_IMAGEN;

  data: any = {
    nombrePersona: "",
    apPaterno: "",
    apMaterno: "",
    username: "",
    password: "",
    puesto: "",
    estado: "",
    ciudad: "",
    codigoPostal: "",
    colonia: "",
    calle: "",
    numExt: "",
    numInt: "",
    latitud: "",
    longitud: ""
  } 
  constructor() { }

  ngOnInit(): void {
  }

}
