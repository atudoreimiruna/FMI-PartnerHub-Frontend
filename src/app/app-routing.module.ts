import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth-page/auth/auth.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/modules/home-page/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard] // Apply the AuthGuard to the 'login' route
  }
  // {
  //   path: '**',
  //   redirectTo: 'login' // Add a catch-all route to redirect to '/login' for any unmatched routes
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
