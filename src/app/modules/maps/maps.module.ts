import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './map-comp/maps.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapsComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBhU3J5kgohV9C4enjQW6g2tbzs-MAMTF8"
    })
  ],
  exports: [
    MapsComponent
  ]
})

export class MapModule { }