import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personal } from '../models/personal.model';
import { ApiGolletService } from '../services/api-gollet.service';

@Component({
  selector: 'app-ver-tarjetas',
  templateUrl: './ver-tarjetas.page.html',
  styleUrls: ['./ver-tarjetas.page.scss'],
})
export class VerTarjetasPage implements OnInit {
  Personal: any[] = [];
  Tarjeta: any[] = [];

  constructor(private apiGollet: ApiGolletService,
              private route: ActivatedRoute) {
    const PERSONAL_ID = this.route.snapshot.paramMap.get( 'tarjetaId' );

    this.obtenerOperador( PERSONAL_ID );
    // this.id = PERSONAL_ID;

    // apiGollet.getPersonal()
    //     .subscribe( ( data: any ) => {
    //       // console.log( data.personal );
    //       this.Personal = data.personal;
    //       // console.log( this.Personal );
    //       this.Tarjeta = this.Personal.find( personalData => personalData.uid === PERSONAL_ID );
    //     } );
  }

  ngOnInit() {
  }

  obtenerOperador( id: string ) {
    this.apiGollet.getPersonal()
        .subscribe( ( data: any ) => {
          // console.log( data.personal );
          this.Personal = data.personal;
          // console.log( this.Personal );
          this.Tarjeta = this.Personal.find( personalData => personalData.uid === id );
        } );
    return this.Tarjeta;
  }

}
