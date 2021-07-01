export interface Cliente {
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
    longitud?: number;
}