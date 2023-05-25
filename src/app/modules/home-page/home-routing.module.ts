import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PartnerComponent } from './partner-profile/partner.component';
import { JobComponent } from './job/job.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { LoginComponent } from '../auth-page/auth/auth.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OAuthService } from 'angular-oauth2-oidc';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent
    },
    {
      path: 'login',
      component: LoginComponent 
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'partener/:id',
      component: PartnerComponent
    },
    {
      path: 'evenimente',
      component: PartnerComponent
    },
    {
      path: 'joburi/:id',
      component: JobProfileComponent
    },
    {
      path: 'joburi',
      component: JobComponent
    },
    {
      path: 'practica',
      component: PartnerComponent
    },
    {
      path: 'user/:email',
      component: UserProfileComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { 

    constructor(private oauthService: OAuthService) {
      const email = this.oauthService.getIdentityClaims()?.['email'];
      const userRoute = routes.find(route => route.path === 'user/:email');
      if (userRoute) {
        userRoute.path = `user/${email}`;
      }
    }
  }