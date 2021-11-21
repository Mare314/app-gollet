import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerTarjetasPageRoutingModule } from './ver-tarjetas-routing.module';

import { VerTarjetasPage } from './ver-tarjetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerTarjetasPageRoutingModule
  ],
  declarations: [VerTarjetasPage]
})
export class VerTarjetasPageModule {}
