import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Map, View} from 'ol/';
import Overlay from 'ol/Overlay';
import VectorLayer from 'ol/layer/Vector';
import {fromLonLat} from 'ol/proj';
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


import { environment } from '../../../environments/environment';
import { Cliente } from '../../models/cliente';
import { GlobalService } from '../../services/global.service';
import { ClienteService } from '../../services/cliente.service';
import { Bitacora } from '../../models/bitacora';
import { User } from '../../models/empleado';
import Swal from 'sweetalert2';

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
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.mapa();
  }
  
  mapa(){
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
        // maxZoom: 15,
        // minZoom: 10,
        projection: 'EPSG:4326'
      })
    });

    const popupContainer = document.getElementById('popup-coordinate');
    const popup = new Overlay({
      element: popupContainer
    });

    
    let capa;
    //Ciudades Mexico
    // const ciudades = new VectorImageLayer({
    //   source: new VectorSource({
    //     url: 'http://72.167.220.178:8050/geoserver/telcel/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=telcel%3Acarto_ciudad&maxFeatures=18810&outputFormat=application%2Fjson',
    //     format: new GeoJSON()
    //   })
    // });
    // map.addLayer(ciudades);

    //Colonias todo mexico
    // const colonias = new VectorImageLayer({
    //   source: new VectorSource({
    //     url: 'http://72.167.220.178:8050/geoserver/telcel/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=telcel%3Acarto_colonia&maxFeatures=100000&outputFormat=application%2Fjson',
    //     format: new GeoJSON()
    //   })
    // });

    //Vector de las colonias de Leon 
    // const colonias = new VectorImageLayer({
    //   source: new VectorSource({
    //     url: 'http://72.167.220.178:8050/geoserver/prototipo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prototipo%3Acolonias_leon&maxFeatures=1000&outputFormat=application%2Fjson',
    //     format: new GeoJSON()
    //   })
    // });
    var cqlfilter = 'id_colonia IN (17708)';
    var colonias: any = new Image({
      source: new ImageWMS({
          url: 'http://72.167.220.178:8050/geoserver/prototipo/wms?service=WMS',
          params: {
              'LAYERS': 'prototipo:colonias_leon'
          },
          serverType: 'geoserver'
      })
    });
    colonias.setOpacity(0.3);
    map.addLayer(colonias); 

    //Capa imagen Ciudades
    var ciudad: any = new Image({
      source: new ImageWMS({
          url: 'http://72.167.220.178:8050/geoserver/telcel/wms?',
          params: {
              'LAYERS': 'telcel:carto_ciudad'
          },
          serverType: 'geoserver'
      })
    });
    ciudad.setOpacity(0.2);
    map.addLayer(ciudad); 

    //Capa imagen Estados
    // var estados = new Image({
    //   source: new ImageWMS({
    //       url: 'http://72.167.220.178:8050/geoserver/telcel/wms?',
    //       params: {
    //           'LAYERS': 'telcel:carto_estado'
    //       },
    //       serverType: 'geoserver'
    //   })
    // });
    // estados.setOpacity(0.3);
    // map.addLayer(estados); 
    
    //Capa estados
    // const estados = new VectorImageLayer({
    //   source: new VectorSource({
    //     url: 'http://72.167.220.178:8050/geoserver/telcel/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=telcel%3Acarto_estado&maxFeatures=50&outputFormat=application%2Fjson',
    //     format: new GeoJSON()
    //   })
    // });
    // estados.setOpacity(0.2);
    // map.addLayer(estados);

    let datosColonia;
    map.addOverlay(popup);
    map.on('singleclick',async e => {
      map.removeLayer(capa);
      var cor = toLonLat([e.coordinate[0],e.coordinate[1]], 'EPSG:4326');
      this.data.longitud = cor[0];
      this.data.latitud = cor[1];
      
      map.setView(new View({
        center: fromLonLat([cor[0],cor[1]],'EPSG:4326'),
        zoom: 15,
        // maxZoom: 15,
        // minZoom: 10,
        projection: 'EPSG:4326'
      }))

      let marcador = new Feature({
        geometry: new Point(
            [cor[0], cor[1]]// En dónde se va a ubicar
        ),
    });

    // Agregamos icono
    marcador.setStyle(new Style({
        image: new Icon({
            src: `${this.rutaIMG}/Vector.png`,
        })
    }));
    
    // marcadores debe ser un arreglo
    const marcadores = []; // Arreglo para que se puedan agregar otros más tarde
    marcadores.push(marcador);// Agregamos el marcador al arreglo
    
  
    capa = new VectorLayer({
        source: new Vector({
          features: marcadores, // A la capa le ponemos los marcadores
        })
    });
    //Y agregamos la capa al mapa
    map.addLayer(capa);

    var view = map.getView();
    var url = colonias.getSource().getFeatureInfoUrl(e.coordinate, view.getResolution(), view.getProjection(), 
    {'INFO_FORMAT': 'application/json'}) || [];
    console.log(url);
    
    await fetch(url)
    .then( function(response) {
        // Si todo sale bien en la promesa se devuelve el json de la respuesta
         return response.json();
    })
    .then( function(colonia) {
        datosColonia =  colonia.features[0].properties;
        console.log(datosColonia);

        // si existe myJson.players.list se agregan al contenedor los elementos de list
    });
    console.log(this.data)
    this.data.estado = datosColonia.estado;
    this.data.ciudad = datosColonia.municipio;
    this.data.colonia = datosColonia.colonia;

    });
    console.log(datosColonia);
    

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
