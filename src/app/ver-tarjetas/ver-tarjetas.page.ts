import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Arnes } from '../models/arnes.model';
import { Mo } from '../models/mo.model';
import { Personal } from '../models/personal.model';
import { Registro } from '../models/registro.model';
import { ApiGolletService } from '../services/api-gollet.service';

@Component({
  selector: 'app-ver-tarjetas',
  templateUrl: './ver-tarjetas.page.html',
  styleUrls: ['./ver-tarjetas.page.scss'],
})
export class VerTarjetasPage implements OnInit {
  personal: Personal;
  arneses: Arnes;
  mo: Mo;
  registros: Registro;
  // Tarjeta: any[] = [];

  blnPersonal = false;
  blnArneses = false;
  blnMo = false;
  blnRegistros =  false;
  folder = '';

  constructor(private apiGollet: ApiGolletService,
              private route: ActivatedRoute) {
    const ID = this.route.snapshot.paramMap.get( 'tarjetaId' );
    const FOLDER = this.route.snapshot.paramMap.get( 'folder' );

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
    
    }
    
    ngOnInit() {
      this.folder === 'Personal' ? this.blnPersonal = true : this.blnPersonal = false;
      this.folder === 'Arneses' ? this.blnArneses = true : this.blnArneses = false;
      this.folder === 'MO' ? this.blnMo = true : this.blnMo = false;
      this.folder === 'Registros' ? this.blnRegistros = true : this.blnRegistros = false;
    }

  obtenerOperador( id: string ) {
    let personal:  Personal[] = [];
    this.apiGollet.getPersonal()
        .subscribe( ( data: any ) => {
          personal = data.personal;
          this.personal = personal.find( personalData => personalData.uid === id );
        } );
      return true;
  }

  obtenerArnes( id: string ) {
    let arnes: Arnes[] = [];
    this.apiGollet.getArneses()
        .subscribe( ( data: any ) => {
          arnes = data.arneses;
          this.arneses = arnes.find( arnesData => arnesData.uid === id );
        } );
    return true
  }

  obtenerMO( id: string ) {
    let mo: Mo[] = [];
    this.apiGollet.getMO()
        .subscribe( ( data: any ) => {
          mo = data.MOs;
          this.mo = mo.find( moData => moData.uid === id );
        } );
    return true;
  }

  obtenerRegistro( id: string ) {
    let registro: Registro[] = [];
    this.apiGollet.getRegistros()
        .subscribe( ( data: any ) => {
          registro = data.Registros;
          this.registros = registro.find( regData => regData.uid === id );
        } );
    return true;
  }

}