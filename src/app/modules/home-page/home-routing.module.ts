import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PartnerComponent } from './partner-profile/partner.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
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
      path: 'joburi',
      component: PartnerComponent
    },
    {
      path: 'practica',
      component: PartnerComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }