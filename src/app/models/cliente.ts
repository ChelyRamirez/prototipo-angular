export interface Cliente {
    idpersona?: number;
    idcliente?: number;
    fechavisita?: string;
    nombrePersona: string;
    apPaterno: string;
    apMaterno: string;
    fotoINE?: string;
    telefono: string;
    sueldo?: number;
    empresa: string;
    antiguedad: string;
    pagoMax: number;
    estado?: string;
    ciudad?: string;
    codigoPostal?: string;
    colonia?: string;
    calle?: string;
    numExt?: string;
    numInt?: string;
    latitud?: number;
    latitudReal?: number;
    longitud?: number;
    longitudReal?: number;
    firma?: string;
    comentariovisitante?: string;
}