import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Map, View} from 'ol/';
import Overlay from 'ol-ext/control/Overlay';
import VectorLayer from 'ol/layer/Vector';
import {fromLonLat, transformExtent} from 'ol/proj';
import {toLonLat} from 'ol/proj';

import {Select} from 'ol/interaction';
import {click, platformModifierKeyOnly, singleClick} from 'ol/events/condition';
import Layer from 'ol/layer/Layer';
import GeoJSON from 'ol/format/GeoJSON';
import Image from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/feature';
import Icon from 'ol/style/Icon';
import Tile from "ol/layer/Tile";
import OSM from 'ol/source/osm';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Vector from 'ol/source/Vector';
import Observable from 'ol/Observable';
import {toStringHDMS} from 'ol/coordinate';

import { environment } from '../../../environments/environment';
import { Cliente } from '../../models/cliente';
import { GlobalService } from '../../services/global.service';
import { ClienteService } from '../../services/cliente.service';
import { Bitacora } from '../../models/bitacora';
import { User } from '../../models/empleado';
import Swal from 'sweetalert2';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
})
export class SolicitudComponent implements OnInit {
  
  log: User = JSON.parse(localStorage.getItem('usuario'));
  public rutaIMG = environment.RUTA_IMAGEN;
  
  public imagen: string;
  public longitud: number;
  public latitude: number;
  public markerCl: any;
  
  data: Cliente = {
    nombrePersona: '',
    apPaterno: '',
    apMaterno: '',
    fotoINE: '',
    telefono: '',
    sueldo: null,
    empresa: '',
    antiguedad: '',
    pagoMax: null,
    estado: '',
    ciudad: '',
    codigoPostal: '',
    colonia: '',
    calle: '',
    numExt: '',
    numInt: '',
    latitud: null,
    longitud: null,
  };
  
  bit: Bitacora = {
    modulo: 'Cliente',
    accion: 'Registro de Cliente',
    idEmpleado: 0,
  };
  
  constructor(
    private cliente: ClienteService,
    private bitacora: GlobalService,
    private detet: EmpleadoService,
    private loginService: LoginService,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.mapa();
    
  }
  logout() {
    this.loginService.logout(this.log).subscribe(
      res => {
        if(!res.ok){
          return console.log(res);
        }
        this.bit.idEmpleado = this.log.idEmpleado;
        this.bitacora.registrarBitacora(this.bit).subscribe(
          res => {
              localStorage.removeItem('usuario');
              return this.router.navigate(['/']);
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    )
  }

  mapa(){
    if(!this.detet.detet()){
      this.logout();
    }

    const map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([-101.681460,21.128936],'EPSG:4326'),
        zoom: 11,
        projection: 'EPSG:4326'
      })
    });


    var popup = new Overlay({
      element: document.getElementById('popup'),
      positioning: 'center-left',
    });
    map.addOverlay(popup);

    map.on('click',(evt) => {
      popup.setPosition(evt.coordinate);
      map.addOverlay(popup);

    });
    

  }

  ///#Camara web
  apagar() {
    //Captura de la webcam
    'use strict';
    const video = document.getElementById('video') as HTMLMediaElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const snap = document.getElementById('snap');
    const errorMsgElement = document.querySelector('span#errorMsg');
    const constraints = {
      audio: false,
      video: {
        width: 0,
        height: 0,
      },
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
      video.srcObject = null;
    }
    // Load init
    init();
    var context = canvas.getContext('2d');
    snap.addEventListener('click', () => {
      var i = video;
      context.drawImage(i as unknown as HTMLCanvasElement, 0, 0, 500, 250);
      var dataURL = canvas.toDataURL('image/jpeg', 0.75);
      this.imagen = dataURL.replace(/^data:image\/jpeg;base64,/, '');
      this.imagen;
    });
  }

  encender() {
    //Captura de la webcam
    'use strict';
    const video = document.getElementById('video') as HTMLMediaElement;
    var canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const errorMsgElement = document.querySelector('span#errorMsg');
    canvas.width = canvas.width;
    const constraints = {
      audio: false,
      video: {
        width: 500,
        height: 250,
      },
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
      video.srcObject = stream;
    }
    // Load init
    init();
  }
  ///#endregion

  registrar() {
    if (this.verificar() === 1) {
      this.data.fotoINE = this.imagen;
      this.cliente.registrarCliente(this.data).subscribe(
        (res) => {
          if (!res.ok) {
            return console.log(res);
          }
          this.bit.idEmpleado = this.log.idEmpleado;
          this.bitacora.registrarBitacora(this.bit).subscribe(
            (res) => {
              Swal.fire({
                icon: 'success',
                title: '¡CORRECTO!',
                text: 'Se ha guardado la solicitud',
              });
              this.restablecer();
              return this.encender();
            },
            (err) => console.log(err)
          );
        },
        (err) => console.log(err)
      );
    }
  }

  restablecer() {
    this.data = {
      nombrePersona: '',
      apPaterno: '',
      apMaterno: '',
      fotoINE: '',
      telefono: '',
      sueldo: null,
      empresa: '',
      antiguedad: '',
      pagoMax: null,
      estado: '',
      ciudad: '',
      codigoPostal: '',
      colonia: '',
      calle: '',
      numExt: '',
      numInt: '',
      latitud: null,
      longitud: null,
    };
  }
  
  verificar() {
    if (this.data.nombrePersona !== null) {
      if (this.data.apPaterno !== null) {
        if (this.data.telefono !== null) {
          if (this.data.sueldo !== null) {
            if (this.data.empresa !== null) {
              if (this.data.antiguedad !== null) {
                if (this.data.pagoMax !== null) {
                  if (this.data.estado !== null) {
                    if (this.data.ciudad !== null) {
                      if (this.data.codigoPostal !== null) {
                        if (this.data.colonia !== null) {
                          if (this.data.calle !== null) {
                            if (this.data.numExt !== null) {
                              if (this.data.fotoINE !== null) {
                                return 1;
                              } else {
                                Swal.fire({
                                  icon: 'error',
                                  title: '¡ERROR!',
                                  text: 'Debe tomar una imagen',
                                });
                                return 0;
                              }
                            } else {
                              Swal.fire({
                                icon: 'error',
                                title: '¡ERROR!',
                                text: 'Debe llenar todos los campos',
                              });
                              return 0;
                            }
                          } else {
                            Swal.fire({
                              icon: 'error',
                              title: '¡ERROR!',
                              text: 'Debe llenar todos los campos',
                            });
                            return 0;
                          }
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: '¡ERROR!',
                            text: 'Debe llenar todos los campos',
                          });
                          return 0;
                        }
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: '¡ERROR!',
                          text: 'Debe llenar todos los campos',
                        });
                        return 0;
                      }
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: '¡ERROR!',
                        text: 'Debe llenar todos los campos',
                      });
                      return 0;
                    }
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: '¡ERROR!',
                      text: 'Debe llenar todos los campos',
                    });
                    return 0;
                  }
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: '¡ERROR!',
                    text: 'Debe llenar todos los campos',
                  });
                  return 0;
                }
              } else {
                Swal.fire({
                  icon: 'error',
                  title: '¡ERROR!',
                  text: 'Debe llenar todos los campos',
                });
                return 0;
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'Debe llenar todos los campos',
              });
              return 0;
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: '¡ERROR!',
              text: 'Debe llenar todos los campos',
            });
            return 0;
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Debe llenar todos los campos',
          });
          return 0;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'Debe llenar todos los campos',
        });
        return 0;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡ERROR!',
        text: 'Debe llenar todos los campos',
      });
      return 0;
    }
  }
}
