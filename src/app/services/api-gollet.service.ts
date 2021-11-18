import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiGolletService {
  
  constructor( /*private http: HttpClient*/ ) { 
    console.log( 'api-gollet listo.' );
  }
  
  // getPersonal() {
  //   this.http.get( 'https://gollet-electronics.herokuapp.com/api/personal' )
  //       .subscribe( personal => {
  //         console.log( personal );
  //       } )
  // }
}
