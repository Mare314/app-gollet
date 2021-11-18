import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Personal', url: '/folder/Personal', icon: 'person' },
    { title: 'Arneses', url: '/folder/Arneses', icon: 'extension-puzzle' },
    { title: 'MO', url: '/folder/MO', icon: 'newspaper' },
    { title: 'Actividades', url: '/folder/Actividades', icon: 'pencil' },
    { title: 'Registros', url: '/folder/Registros', icon: 'bar-chart' },
    /*{ title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },*/
  ];
  public labels = ['Configuración'/*, 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'*/];
  constructor() {}
}
