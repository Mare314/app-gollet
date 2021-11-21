export class Personal {
    estado: boolean;
    nombre: string;
    uid: string;

    constructor(estado: boolean,
                nombre: string,
                uid: string){
        this.estado = estado;
        this.nombre = nombre;
        this.uid = uid;
    }
}