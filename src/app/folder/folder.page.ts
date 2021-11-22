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
  busqPH = '';
  
  constructor(private activatedRoute: ActivatedRoute,
              private apiGollet: ApiGolletService,
              private router: Router,
              private alert: AlertController,) { 
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

  verTarjetas( id: string, folder: string ) {
    console.log( `ver-tarjetas/${ id }/${ folder }` );
    this.router.navigateByUrl( `ver-tarjetas/${ id }/${ folder }` );
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

  async agregarArnes() {
    const ALERT = await this.alert.create( {
      header: 'Agregar',
      message: 'Ingrese los datos del arnés',
      inputs: [
        {
          name: 'ARN',
          type: 'text',
          placeholder: 'ARN'
        },
        {
          name: 'cliente',
          type: 'text',
          placeholder: 'Cliente'
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
          handler: ( data ) => {
            if( data.ARN.length === 0 ) {
              return;
            }
            if( data.cliente.length === 0 ) {
              return;
            }

            console.log( data );

            this.apiGollet.postArneses( data )
                .subscribe( res => {
                  // console.log( res );
                  this.apiGollet.getArneses()
                      .subscribe( ( data: any ) => {
                        // console.log( data.arneses );
                        this.Arneses = data.arneses;
                      } );
                },
                error => {
                  alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  // alert( JSON.stringify( error ) );
                } );
            this.lista.closeSlidingItems();
          }
        }
      ]
    } );

    ALERT.present();
  }

  async agregarMO() {
    const ALERT = await this.alert.create( {
      header: 'Agregar',
      message: 'Ingrese los datos de la MO',
      inputs: [
        {
          name: 'MO',
          type: 'text',
          placeholder: 'MO'
        },
        {
          name: 'arnes',
          type: 'text',
          placeholder: 'ARN'
        },
        {
          name: 'cliente',
          type: 'text',
          placeholder: 'Cliente'
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
          handler: ( data ) => {
            if( data.MO.length === 0 ) {
              return;
            }
            if( data.arnes.length === 0 ) {
              return;
            }
            if( data.cliente.length === 0 ) {
              return;
            }

            console.log( data );

            this.apiGollet.postMO( data )
                .subscribe( res => {
                  // console.log( res );
                  this.apiGollet.getMO()
                      .subscribe( ( data: any ) => {
                        console.log( data.MOs );
                        this.MO = data.MOs;
                      } );
                },
                error => {
                  // alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  const e = JSON.stringify( error.error.errors[0].msg );
                  alert( e );
                  // alert( JSON.stringify( error ) );
                } );
            this.lista.closeSlidingItems();
          }
        }
      ]
    } );

    ALERT.present();
  }

  async agregarRegistro() {
    const fecha = new Date();
    const dateFormated = fecha.getFullYear() + '-' + ( fecha.getMonth() + 1 ) + '-' + fecha.getDate();
    const hora = fecha.getHours() + ':' + fecha.getMinutes();
    

    console.log(dateFormated, hora);

    const ALERT = await this.alert.create( {
      header: 'Agregar',
      message: 'Ingrese la información del registro.',
      inputs: [
        {
          name: 'actividad',
          type: 'text',
          placeholder: 'Actividad'
        },
        {
          name: 'arnes',
          type: 'text',
          placeholder: 'Arnés'
        },
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad'
        },
        {
          name: 'fecha',
          type: 'date',
          value: dateFormated
        },
        {
          name: 'inicio',
          type: 'time',
          value: hora 
        },
        {
          name: 'fin',
          type: 'time'
        },
        {
          name: 'mo',
          type: 'text',
          placeholder: 'MO' 
        },
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
          text: 'Editar',
          handler: ( data ) => {
            if( data.actividad.length === 0 ) {
              return;
            }
            if( data.arnes.length === 0 ) {
              return;
            }
            if( data.cantidad.length === 0 ) {
              return;
            }
            if( data.fecha.length === 0 ) {
              return;
            }
            if( data.inicio.length === 0 ) {
              return;
            }
            if( data.mo.length === 0 ) {
              return;
            }
            if( data.nombre.length === 0 ) {
              return;
            }

            data.actividad = data.actividad.toLowerCase();

            this.apiGollet.postRegistros( data )
                .subscribe( res => {
                  // console.log( res );
                  this.apiGollet.getRegistros()
                      .subscribe( ( data: any ) => {
                        console.log( data.Registros );
                        this.Registros = data.Registros;
                      } );
                },
                error => {
                  // alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  const e = JSON.stringify( error.error.errors[0].msg );
                  alert( e );
                  // alert( JSON.stringify( error ) );
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

  async editarArnes( arnes: any ) {
    const ALERT = await this.alert.create( {
      header: 'Editar',
      message: 'Ingrese los datos actualizados del arnes',
      inputs: [
        {
          name: 'arn',
          type: 'text',
          value: arnes.ARN
        },
        {
          name: 'cliente',
          type: 'text',
          value: arnes.cliente
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
          handler: ( data ) => {
            if( data.arn.length === 0 ) {
              return;
            }
            if( data.cliente.length === 0 ) {
              return;
            }

            arnes.ARN = data.arn;
            arnes.cliente = data.cliente;
            this.apiGollet.putArneses( arnes )
                .subscribe( res => {
                  console.log( res );
                },
                error => {
                  // alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  alert( JSON.stringify( error ) );
                  console.log( JSON.stringify( error ) );
                } );
            this.lista.closeSlidingItems();
          }
        }
      ]
    } );

    ALERT.present();
  }

  async editarMO( mo: any ) {
    const ALERT = await this.alert.create( {
      header: 'Editar',
      message: 'Ingrese los datos actualizados de la MO',
      inputs: [
        {
          name: 'MO',
          type: 'text',
          value: mo.MO
        },
        {
          name: 'arnes',
          type: 'text',
          value: mo.arnes
        },
        {
          name: 'cliente',
          type: 'text',
          value: mo.cliente
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
          handler: ( data ) => {
            if( data.MO.length === 0 ) {
              return;
            }
            if( data.arnes.length === 0 ) {
              return;
            }
            if( data.cliente.length === 0 ) {
              return;
            }

            mo.MO = data.MO;
            mo.arnes = data.arnes;
            mo.cliente = data.cliente;
            this.apiGollet.putMO( mo )
                .subscribe( res => {
                  // console.log( res );
                },
                error => {
                  // alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  const e = JSON.stringify( error.error.errors[0].msg );
                  alert( e );
                  // console.log( JSON.stringify( error ) );
                } );
            this.lista.closeSlidingItems();
          }
        }
      ]
    } );

    ALERT.present();
  }

  async editarRegistro( registro: any ) {
    // console.log( registro.fecha );
    const dateData = registro.fecha.split('-');
    const year = dateData [0];
    const month = dateData [1];
    const day = dateData [2];
    const day2 = day.slice(0, 2);
    const hour = day.slice(3, 5);
    const minute = day.slice(6, 8);
    const dateFormated = year + "-" + month + "-" + day2;
    let hourFormated = hour + ":" + minute;
    let hourFormated2 = '';
    console.log(day);
    console.log(hourFormated);

    if(registro.inicio) {
      const hourData = registro.inicio.split(':');
      const hour2 = hourData [0];
      const minute2 = hourData [1];
      hourFormated = hour2 + ":" + minute2;
    }

    if( registro.fin ) {
      const hourData = registro.fin.split(':');
      const hour2 = hourData [0];
      const minute2 = hourData [1];
      hourFormated2 = hour2 + ":" + minute2;
    }
    // console.log( hourFormated );
    const ALERT = await this.alert.create( {
      header: 'Editar',
      message: 'Ingrese la información actualizada del registro.',
      inputs: [
        {
          name: 'actividad',
          type: 'text',
          value: registro.actividad
        },
        {
          name: 'arnes',
          type: 'text',
          value: registro.arnes
        },
        {
          name: 'cantidad',
          type: 'number',
          value: registro.cantidad
        },
        {
          name: 'fecha',
          type: 'date',
          value: dateFormated
        },
        {
          name: 'inicio',
          type: 'time',
          value: hourFormated
        },
        {
          name: 'fin',
          type: 'time',
          value: hourFormated2
        },
        {
          name: 'mo',
          type: 'text',
          value: registro.mo
        },
        {
          name: 'nombre',
          type: 'text',
          value: registro.nombre
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
          handler: ( data ) => {
            if( data.actividad.length === 0 ) {
              return;
            }
            if( data.arnes.length === 0 ) {
              return;
            }
            if( data.cantidad.length === 0 ) {
              return;
            }
            if( data.fecha.length === 0 ) {
              return;
            }
            // if( data.inicio.length === 0 ) {
            //   return;
            // }
            // if( data.fin.length === 0 ) {
            //   return;
            // }
            if( data.mo.length === 0 ) {
              return;
            }
            if( data.nombre.length === 0 ) {
              return;
            }

            registro.actividad = data.actividad;
            registro.arnes = data.arnes;
            registro.cantidad = data.cantidad;
            registro.fecha = data.fecha;
            registro.inicio = data.inicio;
            registro.fin = data.fin;
            registro.mo = data.mo;
            registro.nombre = data.nombre;

            this.apiGollet.putRegistros( registro )
                .subscribe( res => {
                  // console.log( res );
                },
                error => {
                  // alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  const e = JSON.stringify( error.error.errors[0].msg );
                  alert( e );
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
                  // alert( 'Ocurrió un error. Póngase en contacto con el administrador.');
                  alert( JSON.stringify( error ) );
                  console.log( JSON.stringify( error ) );
                } );

            this.lista.closeSlidingItems();
          }
        }
      ]
    } );

    ALERT.present();
  }

  async eliminarArnes( id: string ) {
    const ALERT = await this.alert.create( {
      header: 'Confirmar',
      message: '¿Está seguro que desea eliminar este arnés?',
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
            this.apiGollet.deleteArneses( id )
                .subscribe( res => {
                  this.apiGollet.getArneses()
                      .subscribe( ( data: any ) => {
                        console.log( data.arneses );
                        this.Arneses = data.arneses;
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

  async eliminarMO( id: string ) {
    const ALERT = await this.alert.create( {
      header: 'Confirmar',
      message: '¿Está seguro que desea eliminar esta MO?',
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
            this.apiGollet.deleteMO( id )
                .subscribe( res => {
                  this.apiGollet.getMO()
                      .subscribe( ( data: any ) => {
                        console.log( data.MOs );
                        this.MO = data.MOs;
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

  async eliminarRegistro( id: string ) {
    const ALERT = await this.alert.create( {
      header: 'Confirmar',
      message: '¿Está seguro que desea eliminar esta MO?',
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
            this.apiGollet.deleteRegistros( id )
                .subscribe( res => {
                  this.apiGollet.getRegistros()
                      .subscribe( ( data: any ) => {
                        console.log( data.Registros );
                        this.Registros = data.Registros;
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

  buscarPersonal( termino: string ) {
    this.busqPH = 'Buscar nombre.'

    if( !termino ) {
      this.apiGollet.getPersonal()
        .subscribe( ( data: any ) => {
          console.log( data.personal );
          this.Personal = data.personal;
        } );
    }

    let personalArr: any [] = [];
    termino = termino.toLowerCase();

    for( let operador of this.Personal ){
      let nombre = operador.nombre.toLowerCase();

      if( nombre.indexOf( termino ) >= 0 ) {
        personalArr.push( operador );
      }
    }
    // console.log( personalArr );
    this.Personal = personalArr;
  }

  buscarArnes( termino: string ) {
    this.busqPH = 'Buscar ARN.'

    if( !termino ) {
      this.apiGollet.getArneses()
        .subscribe( ( data: any ) => {
          console.log( data.arneses );
          this.Arneses = data.arneses;
        } );
    }

    let arnArr: any [] = [];
    termino = termino.toLowerCase();

    for( let arn of this.Arneses ){
      let arnn = arn.ARN.toLowerCase();

      if( arnn.indexOf( termino ) >= 0 ) {
        arnArr.push( arn );
      }
    }
    // console.log( arnArr );
    this.Arneses = arnArr;
  }

  buscarMO( termino: string ) {
    this.busqPH = 'Buscar No. de MO.'

    if( !termino ) {
      this.apiGollet.getMO()
          .subscribe( ( data: any ) => {
            console.log( data.MOs );
            this.MO = data.MOs;
          } );
    }

    let moArr: any [] = [];
    termino = termino.toLowerCase();

    for( let mo of this.MO ){
      let moo = mo.MO.toLowerCase();

      if( moo.indexOf( termino ) >= 0 ) {
        moArr.push( mo );
      }
    }
    // console.log( moArr );
    this.MO = moArr;
  }

  buscarRegistro( termino: string ) {
    this.busqPH = 'Buscar actividad.'

    if( !termino ) {
      this.apiGollet.getRegistros()
          .subscribe( ( data: any ) => {
            console.log( data.Registros );
            this.Registros = data.Registros;
          } );
    }

    let regArr: any [] = [];
    termino = termino.toLowerCase();

    for( let registro of this.Registros ){
      let nombre = registro.actividad.toLowerCase();

      if( nombre.indexOf( termino ) >= 0 ) {
        regArr.push( registro );
      }
    }
    // console.log( regArr );
    this.Registros = regArr;
  }

  buscar( folder: string, termino: string ) {
    switch( folder ) {
      case 'Personal':
        this.buscarPersonal( termino );
      break;
      case 'Arneses':
        this.buscarArnes( termino );
      break;
      case 'MO':
        this.buscarMO( termino );
      break;
      case 'Registros':
        this.buscarRegistro( termino );
      break;

      default:
        return;
    }
  }

  agregar( folder: string ) {
    // console.log( folder );
    switch( folder ) {
      case 'Personal':
        this.agregarOperador();
      break;
      case 'Arneses':
        this.agregarArnes();
      break;
      case 'MO':
        this.agregarMO();
      break;
      case 'Registros':
        this.agregarRegistro();
      break;

      default:
        return;
    }
  }

}
