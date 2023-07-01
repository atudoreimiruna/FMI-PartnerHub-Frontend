import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth-page/auth/auth.component';
import { AuthGuard } from './auth.guard';
import { AuthUsersGuard } from './auth.users.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/modules/home-page/home.module').then(m => m.HomeModule),
    canActivate: [AuthUsersGuard] 
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
