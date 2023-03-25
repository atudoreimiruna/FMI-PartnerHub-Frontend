import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ImageSliderModule } from '../slideshow/image-slider.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ImageSliderModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})

export class HomeModule { }