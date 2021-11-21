import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerTarjetasPage } from './ver-tarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: VerTarjetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerTarjetasPageRoutingModule {}
