import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiGolletService {
  
  // constructor( private http: HTTP ) { 
  //   console.log( 'api-gollet listo.' );
  // }

  constructor( private http: HttpClient ) { 
    console.log( 'api-gollet listo.' );
  }

  getPersonal() {
    return this.http.get( 'https://gollet-electronics.herokuapp.com/api/personal' );
  }

  getArneses() {
    return this.http.get( 'https://gollet-electronics.herokuapp.com/api/arneses' );
  }

  getMO() {
    return this.http.get( 'https://gollet-electronics.herokuapp.com/api/mo' );
  }

  getActividades() {
    // return this.http.get( 'https://gollet-electronics.herokuapp.com/api/' );
  }

  getRegistros() {
    return this.http.get( 'https://gollet-electronics.herokuapp.com/api/registro' );
  }
  
  // getPersonal() {
  //   this.http.get( 'https://gollet-electronics.herokuapp.com/api/personal', {}, {} )
  //       .then( data => {
  //         console.log( data.status );
  //         console.log( data.data );
  //         console.log( data.headers );
  //       } )
  //       .catch( error => {
  //         console.log( error.status );
  //         console.log( error.error );
  //         console.log( error.headers );
  //       } );
  // }
}
