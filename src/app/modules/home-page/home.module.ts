import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ImageSliderModule } from '../slideshow/image-slider.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProfileCompModule } from '../partner-profile-comp/profile-comp.module';
import { PartnerComponent } from './partner-profile/partner.component';
import { JobComponent } from './job/job.component';
import { LoginModule } from '../auth-page/auth/auth.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HomeComponent,
    PartnerComponent,
    JobComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ImageSliderModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    ProfileCompModule,
    LoginModule,
    FormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  exports: [
    HomeComponent,
    PartnerComponent,
    JobComponent,
    PaginationComponent
  ]
})

export class HomeModule { }