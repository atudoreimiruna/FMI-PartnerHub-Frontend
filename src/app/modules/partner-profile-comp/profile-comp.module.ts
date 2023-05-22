import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLeftComponent } from './profile-left/profile-left.component';
import { ProfileRightComponent } from './profile-right/profile-right.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    ProfileLeftComponent,
    ProfileRightComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAg2osjcgX8Xs-colEx3U2AsozS75gy76Y"
  })
  ],
  exports: [
    ProfileLeftComponent,
    ProfileRightComponent
  ]
})

export class ProfileCompModule { }