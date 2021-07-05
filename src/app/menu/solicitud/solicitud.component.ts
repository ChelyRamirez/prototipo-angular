import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Bitacora } from '../../models/bitacora';
import { User } from '../../models/empleado';
import Swal from 'sweetalert2';
declare var H: any;
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  public imagen:string;

  private platform: any;
  private map: any;
  private defaultLayers: any;
  public rutaIMG = environment.RUTA_IMAGEN;
  data: Cliente = {
    nombrePersona: "",
    apPaterno: "",
    apMaterno: "",
    fotoINE: "",
    telefono: "",
    sueldo: null,
    empresa: "",
    antiguedad: "",
    pagoMax: null,
    estado: "",
    ciudad: "",
    codigoPostal: "",
    colonia: "",
    calle: "",
    numExt: "",
    numInt: "",
    latitud: null,
    longitud: null,
  }
  bit: Bitacora = {
    modulo: 'Cliente',
    accion: 'Registro de Cliente',
    idEmpleado: 0
  }
  log: User = JSON.parse(localStorage.getItem('usuario'));
  markerCl: any;
  puntosLayer: any;
  
  constructor(
    private cliente: ClienteService,
    private bitacora: GlobalService,
    private router: Router
  ) { 
    this.platform = new H.service.Platform({
      "apikey": "Ib2YJfQW-Ak3OnSVB5943IkDnFavxZKnbv6euTs6Mz8"
    });
  }
  ngOnInit(): void {
    const divMapCl = document.getElementById("map-container")
    this.defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      divMapCl, this.defaultLayers.vector.normal.map,
      {
        zoom: 15,
        center: {lat: 21.1443575, lng: -101.6918062},
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))
    let ui = H.ui.UI.createDefault(this.map, this.defaultLayers);    

    this.encender();
      }

     apagar(){
      //Captura de la webcam
    'use strict';

    const video = document.getElementById('video') as HTMLCanvasElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const snap = document.getElementById("snap");
    const errorMsgElement = document.querySelector('span#errorMsg');

    const constraints = {
      audio: false,
      video:  {
        width: 0, height: 0
      }
    };

    // Acceso a la webcam
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
      } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
      }
    }

    // Success
    function handleSuccess(stream) {
      window.MSStream = null;
      video.srcObject = null;
    }

    // Load init
    init();

     var context = canvas.getContext('2d');
    snap.addEventListener("click", () => {

            context.drawImage(video, 0, 0, 500, 250);
            var dataURL = canvas.toDataURL("image/png");
            this.imagen = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
          });

    

     }







     encender(){
       //Captura de la webcam
    'use strict';

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snap = document.getElementById("snap");
    const errorMsgElement = document.querySelector('span#errorMsg');

    const constraints = {
      audio: true,
      video:  {
        width: 500, height: 250
      }
    };

    // Acceso a la webcam
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
      } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
      }
    }

    // Success
    function handleSuccess(stream) {
      window.MSStream = stream;
      video.srcObject = stream;
    }

    // Load init
    init();

    // Dibujar imagen
    
     }
      
  registrar(){
    if(this.verificar() === 1){
      this.cliente.registrarCliente(this.data).subscribe(
        res => {
          if( !res.ok ) {
            return console.log(res);
          }
          this.bit.idEmpleado = this.log.idEmpleado;
          this.bitacora.registrarBitacora(this.bit).subscribe(
            res => {
              Swal.fire({
                icon: 'success',
                title: '¡CORRECTO!',
                text: 'Se ha guardado la solicitud'
              });
              return this.restablecer();     
            },
            err => console.log(err)
          )
        },    
        err => console.log(err)
        );
    }
  }
  restablecer(){
    this.data = {
      nombrePersona: "",
      apPaterno: "",
      apMaterno: "",
      fotoINE: "",
      telefono: "",
      sueldo: null,
      empresa: "",
      antiguedad: "",
      pagoMax: null,
      estado: "",
      ciudad: "",
      codigoPostal: "",
      colonia: "",
      calle: "",
      numExt: "",
      numInt: "",
      latitud: null,
      longitud: null,
    }
  }
  verificar(){
    if( this.data.nombrePersona !== null ){
      if(this.data.apPaterno !== null ){
        if(this.data.telefono !== null){
          if(this.data.sueldo !== null){
            if(this.data.empresa !== null){
              if(this.data.antiguedad !== null){
                if(this.data.pagoMax !== null){
                  if(this.data.estado !== null){
                    if(this.data.ciudad !== null){
                      if(this.data.codigoPostal !== null){
                        if(this.data.colonia !== null){
                          if(this.data.calle !== null){
                            if(this.data.numExt !== null){
                              return 1;
                            } else {
                              Swal.fire({
                                icon: 'error',
                                title: '¡ERROR!',
                                text: 'Debe llenar todos los campos'
                              });
                              return 0;
                            }
                          } else {
                             Swal.fire({
                              icon: 'error',
                              title: '¡ERROR!',
                              text: 'Debe llenar todos los campos'
                            });
                            return 0;
                          }
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: '¡ERROR!',
                            text: 'Debe llenar todos los campos'
                          });
                          return 0;
                        }
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: '¡ERROR!',
                          text: 'Debe llenar todos los campos'
                        });
                        return 0;
                      }
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: '¡ERROR!',
                        text: 'Debe llenar todos los campos'
                      });
                      return 0;
                    }
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: '¡ERROR!',
                      text: 'Debe llenar todos los campos'
                    });
                    return 0;
                  }
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: '¡ERROR!',
                    text: 'Debe llenar todos los campos'
                  });
                  return 0;
                }
              } else {
                Swal.fire({
                  icon: 'error',
                  title: '¡ERROR!',
                  text: 'Debe llenar todos los campos'
                });
                return 0;
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'Debe llenar todos los campos'
              });
              return 0;
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: '¡ERROR!',
              text: 'Debe llenar todos los campos'
            });
            return 0;
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Debe llenar todos los campos'
          });
          return 0;
        }
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Debe llenar todos los campos'
          });
          return 0;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'Debe llenar todos los campos'
        });
        return 0;
      }
  }
}