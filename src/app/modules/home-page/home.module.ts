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
import { LoginModule } from '../auth-page/auth.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationComponent } from './pagination/pagination.component';
import { JobCompModule } from '../job-profile-comp/job-comp.module';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { NavBarCompModule } from '../nav-bar-comp/nav-bar-comp.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FooterCompModule } from '../footer-comp/footer-comp.module';
import { UserProfileSettingsComponent } from './user-profile-settings/user-profile-settings.component';
import { UserProfileJobsComponent } from './user-profile-jobs/user-profile-jobs.component';
import { PracticaComponent } from './practica/practica.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { SuperAdminProfileComponent } from './superadmin-profile/superadmin-profile.component';
import { UserProfilePartnersComponent } from './user-profile-partners/user-profile-partners.component';

@NgModule({
  declarations: [
    HomeComponent,
    PartnerComponent,
    JobComponent,
    PaginationComponent,
    JobProfileComponent,
    UserProfileComponent,
    UserProfileSettingsComponent,
    UserProfileJobsComponent,
    PracticaComponent,
    AdminProfileComponent,
    SuperAdminProfileComponent,
    UserProfilePartnersComponent
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
    JobCompModule,
    NavBarCompModule,
    FooterCompModule
  ],
  exports: [
    HomeComponent,
    PartnerComponent,
    JobComponent,
    PaginationComponent,
    JobProfileComponent,
    UserProfileComponent,
    UserProfileSettingsComponent,
    UserProfileJobsComponent,
    PracticaComponent,
    AdminProfileComponent,
    SuperAdminProfileComponent,
    UserProfilePartnersComponent
  ]
})

export class HomeModule { }