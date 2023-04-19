import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ImageSliderModule } from '../slideshow/image-slider.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProfileCompModule } from '../partner-profile-comp/profile-comp.module';
import { PartnerComponent } from './partner-profile/partner.component';

@NgModule({
  declarations: [
    HomeComponent,
    PartnerComponent
  ],
  imports: [
    CommonModule,
    ImageSliderModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    ProfileCompModule
  ],
  exports: [
    HomeComponent,
    PartnerComponent
  ]
})

export class HomeModule { }