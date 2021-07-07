import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public rutaIMG = environment.RUTA_IMAGEN;

  constructor() { }

  ngOnInit(): void {
  }

}
