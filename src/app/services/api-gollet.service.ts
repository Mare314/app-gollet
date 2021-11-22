import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../models/personal.model';
// import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiGolletService {
  
  personal: any[] = [];

  constructor( private http: HttpClient ) { 
    console.log( 'api-gollet listo.' );
  }

  getPersonal() {
    return this.http.get( 'https://gollet-electronics.herokuapp.com/api/personal/?limite=' );
  }

  putPersonal( personal: any ) {
    return this.http.put( `https://gollet-electronics.herokuapp.com/api/personal/${ personal.uid }`, personal );
  }

  postPersonal( personal: any ) {
    return this.http.post( 'https://gollet-electronics.herokuapp.com/api/personal', personal );
  }

  deletePersonal( id: string ) {
    return this.http.delete( `https://gollet-electronics.herokuapp.com/api/personal/${ id }` );
  }

  getArneses() {
    return this.http.get( 'https://gollet-electronics.herokuapp.com/api/arneses' );
  }

  putArneses( arnes: any ) {
    return this.http.put( `https://gollet-electronics.herokuapp.com/api/arneses/${ arnes.uid }`, arnes );
  }

  postArneses( arnes: any ) {
    return this.http.post( 'https://gollet-electronics.herokuapp.com/api/arneses', arnes );
  }

  deleteArneses( id: string ) {
    return this.http.delete( `https://gollet-electronics.herokuapp.com/api/arneses/${ id }` );
  }

  getMO() {
    return this.http.get( 'https://gollet-electronics.herokuapp.com/api/mo' );
  }

  putMO( MO: any ) {
    return this.http.put( `https://gollet-electronics.herokuapp.com/api/mo/${ MO.uid }`, MO );
  }

  postMO( MO: any ) {
    return this.http.post( 'https://gollet-electronics.herokuapp.com/api/mo', MO );
  }

  deleteMO( id: string ) {
    return this.http.delete( `https://gollet-electronics.herokuapp.com/api/mo/${ id }` );
  }

  // getActividades() {
  //   return this.http.get( 'https://gollet-electronics.herokuapp.com/api/' );
  // }

  getRegistros() {
    return this.http.get( 'https://gollet-electronics.herokuapp.com/api/registro' );
  }

  putRegistros( registro: any ) {
    return this.http.put( `https://gollet-electronics.herokuapp.com/api/registro/${ registro.uid }`, registro );
  }

  postRegistros( registro: any ) {
    return this.http.post( 'https://gollet-electronics.herokuapp.com/api/registro', registro );
  }

  deleteRegistros( id: string ) {
    return this.http.delete( `https://gollet-electronics.herokuapp.com/api/registro/${ id }` );
  }
  
  // obtenerOperador( id: string ) {
  //   this.getPersonal()
  //       .subscribe( ( data: any ) => {
  //         data.personal.find( personalData => personalData.uid == id );
  //       } );

  //   // console.log(this.personal);

  //   // return this.personal.find( personalData => personalData.uid === id );
  // }
}
