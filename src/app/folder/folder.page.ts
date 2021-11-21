import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGolletService } from '../services/api-gollet.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  @ViewChild( IonList ) lista: IonList;

  public folder: string;

  Personal: any[] = [];
  Arneses: any[] = [];
  MO: any[] = [];
  Actividades: any[] = [];
  Registros: any[] = [];
  
  personal = false;
  arneses = false;
  mo = false;
  actividades = false;
  registros =  false;
  
  constructor(private activatedRoute: ActivatedRoute,
              private apiGollet: ApiGolletService,
              private router: Router,
              private alert: AlertController) { 
    apiGollet.getPersonal()
      .subscribe( ( data: any ) => {
        console.log( data.personal );
        this.Personal = data.personal;
      } );
    apiGollet.getArneses()
      .subscribe( ( data: any ) => {
        console.log( data.arneses );
        this.Arneses = data.arneses;
      } );
    apiGollet.getMO()
      .subscribe( ( data: any ) => {
        console.log( data.MOs );
        this.MO = data.MOs;
      } );
    // apiGollet.getActividades()
    //   .subscribe( ( data: any ) => {
    //     console.log( data );
    //   } );
    apiGollet.getRegistros()
      .subscribe( ( data: any ) => {
        console.log( data.Registros );
        this.Registros = data.Registros;
      } )
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.folder == 'Personal' ? this.personal = true : this.personal = false;
    this.folder == 'Arneses' ? this.arneses = true : this.arneses = false;
    this.folder == 'MO' ? this.mo = true : this.mo = false;
    this.folder == 'Actividades' ? this.actividades = true : this.actividades = false;
    this.folder == 'Registros' ? this.registros = true : this.registros = false;
  }

  verTarjetas( id: any ) {
    this.router.navigateByUrl( `ver-tarjetas/${ id }` );
  }

  async agregarOperador() {
    const ALERT = await this.alert.create( {
      header: 'Agregar',
      message: 'Ingrese los datos del operador',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Agregar',
          handler: ( personal ) => {
            if( personal.nombre.length === 0 ) {
              return;
            }

            this.apiGollet.postPersonal( personal )
                .subscribe( res => {
                  // console.log( res );
                  this.apiGollet.getPersonal()
                    .subscribe( ( data: any ) => {
                      // console.log( data.personal );
                      this.Personal = data.personal;
                    } );
                },
                error => {
                  alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  // alert( JSON.stringify( error ) );
                  // console.log( JSON.stringify( error ) );
                } );
            this.lista.closeSlidingItems();
          }
        }
      ]
    } );

    ALERT.present();
  }

  async editarOperador( operador: any ) {
    const ALERT = await this.alert.create( {
      header: 'Editar',
      message: 'Ingrese los datos actualizados del operador',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: operador.nombre
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: ( personal ) => {
            if( personal.nombre.length === 0 ) {
              return;
            }

            operador.nombre = personal.nombre;
            this.apiGollet.putPersonal( operador )
                .subscribe( res => {
                  // console.log( res );
                },
                error => {
                  alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  // alert( JSON.stringify( error ) );
                  // console.log( JSON.stringify( error ) );
                } );
            this.lista.closeSlidingItems();
          }
        }
      ]
    } );

    ALERT.present();
  }

  async eliminarOperador( id: string ) {
    const ALERT = await this.alert.create( {
      header: 'Confirmar',
      message: '¿Está seguro que desea eliminar este operador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.apiGollet.deletePersonal( id )
                .subscribe( res => {
                  this.apiGollet.getPersonal()
                      .subscribe( ( data: any ) => {
                        console.log( data.personal );
                        this.Personal = data.personal;
                      } );
                },
                error => {
                  alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  // alert( JSON.stringify( error ) );
                  // console.log( JSON.stringify( error ) );
                } );

            this.lista.closeSlidingItems();
          }
        }
      ]
    } );

    ALERT.present();
  }

  agregar( folder: string ) {
    // console.log( folder );
    switch( folder ) {
      case 'Personal':
        this.agregarOperador()
      break;

      default:
        return;
    }
  }

}
