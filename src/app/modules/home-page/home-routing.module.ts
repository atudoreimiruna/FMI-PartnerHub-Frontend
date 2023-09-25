import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PartnerComponent } from './partner-profile/partner.component';
import { JobComponent } from './job/job.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { LoginComponent } from '../auth-page/auth/auth.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileSettingsComponent } from './user-profile-settings/user-profile-settings.component';
import { UserProfileJobsComponent } from './user-profile-jobs/user-profile-jobs.component';
import { PracticeComponent } from './practice/practice.component';
import { AuthUserGuard } from 'src/app/auth.user.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AuthAdminGuard } from 'src/app/auth.admin.guard';
import { AuthSuperAdminGuard } from 'src/app/auth.superadmin.guard';
import { SuperAdminProfileComponent } from './superadmin-profile/superadmin-profile.component';
import { UserProfilePartnersComponent } from './user-profile-partners/user-profile-partners.component';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthUsersGuard } from 'src/app/auth.users.guard';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent,
      // canActivate: [AuthGuard] 
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [AuthGuard] 
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthUsersGuard] 
    },
    {
      path: 'partener/:id',
      component: PartnerComponent,
      canActivate: [AuthUsersGuard] 
    },
    // {
    //   path: 'partener/admin/:id',
    //   component: PartnerComponent,
    //   canActivate: [AuthUsersGuard] 
    // },
    {
      path: 'evenimente',
      component: PartnerComponent,
      canActivate: [AuthUsersGuard] 
    },
    {
      path: 'joburi/:id',
      component: JobProfileComponent,
      canActivate: [AuthUsersGuard] 
    },
    {
      path: 'joburi',
      component: JobComponent,
      canActivate: [AuthUsersGuard] 
    },
    {
      path: 'practica',
      component: PracticeComponent,
      canActivate: [AuthUsersGuard] 
    },
    {
      path: 'user/:email',
      component: UserProfileComponent,
      canActivate: [AuthUserGuard] 
    },
    {
      path: 'user/cont/:email',
      component: UserProfileSettingsComponent,
      canActivate: [AuthUserGuard] 
    },
    {
      path: 'user/joburi/:email',
      component: UserProfileJobsComponent,
      canActivate: [AuthUserGuard] 
    },
    {
      path: 'user/parteneri/:email',
      component: UserProfilePartnersComponent,
      canActivate: [AuthUserGuard] 
    },
    {
      path: 'admin/:email',
      component: AdminProfileComponent,
      canActivate: [AuthAdminGuard] 
    },
    {
      path: 'superadmin/:email',
      component: SuperAdminProfileComponent,
      canActivate: [AuthSuperAdminGuard] 
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { 
    // constructor(private oauthService: OAuthService) {
    //   const email = this.oauthService.getIdentityClaims()?.['email'];

    //   const userRoute = routes.find(route => route.path === 'user/:email');
    //   if (userRoute) {
    //     userRoute.path = `user/${email}`;
    //   }
    // }
  }



    
