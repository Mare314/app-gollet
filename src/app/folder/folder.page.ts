import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGolletService } from '../services/api-gollet.service';
// import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
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
              private apiGollet: ApiGolletService) { 
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

}
