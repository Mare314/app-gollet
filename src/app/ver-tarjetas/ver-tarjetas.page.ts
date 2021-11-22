import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGolletService } from '../services/api-gollet.service';

@Component({
  selector: 'app-ver-tarjetas',
  templateUrl: './ver-tarjetas.page.html',
  styleUrls: ['./ver-tarjetas.page.scss'],
})
export class VerTarjetasPage implements OnInit {
  Personal: any[] = [];
  Arneses: any[] = [];
  MO: any[] = [];
  Actividades: any[] = [];
  Registros: any[] = [];
  Tarjeta: any[] = [];

  personal = false;
  arneses = false;
  mo = false;
  actividades = false;
  registros =  false;
  folder = '';

  constructor(private apiGollet: ApiGolletService,
              private route: ActivatedRoute) {
    const ID = this.route.snapshot.paramMap.get( 'tarjetaId' );
    const FOLDER = this.route.snapshot.paramMap.get( 'folder' )

    this.folder = FOLDER;

    switch( FOLDER ) {
      case 'Personal':
        this.obtenerOperador( ID );        
      break;
      case 'Arneses':
        this.obtenerArnes( ID );
      break;
      case 'MO':
        this.obtenerMO( ID );
      break;
      case 'Registros':
        this.obtenerRegistro( ID );
      break;

      default:
        return;
    }
    
    
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
      this.folder == 'Personal' ? this.personal = true : this.personal = false;
      this.folder == 'Arneses' ? this.arneses = true : this.arneses = false;
      this.folder == 'MO' ? this.mo = true : this.mo = false;
      this.folder == 'Actividades' ? this.actividades = true : this.actividades = false;
      this.folder == 'Registros' ? this.registros = true : this.registros = false;
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

  obtenerArnes( id: string ) {
    this.apiGollet.getArneses()
        .subscribe( ( data: any ) => {
          console.log( data );
          this.Arneses = data.arneses;
          // console.log( this.Personal );
          this.Tarjeta = this.Arneses.find( arnesData => arnesData.uid === id );
        } );
    return this.Tarjeta;
  }

  obtenerMO( id: string ) {
    this.apiGollet.getMO()
        .subscribe( ( data: any ) => {
          console.log( data );
          this.MO = data.MOs;
          // console.log( this.Personal );
          this.Tarjeta = this.MO.find( moData => moData.uid === id );
        } );
    return this.Tarjeta;
  }

  obtenerRegistro( id: string ) {
    this.apiGollet.getRegistros()
        .subscribe( ( data: any ) => {
          console.log( data.Registros );
          this.Registros = data.Registros;
          // console.log( this.Personal );
          this.Tarjeta = this.Registros.find( regData => regData.uid === id );
        } );
    return this.Tarjeta;
  }

}
