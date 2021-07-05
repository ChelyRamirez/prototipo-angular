import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.css']
})
export class AprobacionComponent implements OnInit {

  public rutaIMG = environment.IMG;
  
  constructor() { }

  ngOnInit(): void {
  }

}
