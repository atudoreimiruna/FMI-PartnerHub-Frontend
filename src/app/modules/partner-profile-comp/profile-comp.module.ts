import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLeftComponent } from './profile-left/profile-left.component';
import { ProfileRightComponent } from './profile-right/profile-right.component';

@NgModule({
  declarations: [
    ProfileLeftComponent,
    ProfileRightComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileLeftComponent,
    ProfileRightComponent
  ]
})

export class ProfileCompModule { }