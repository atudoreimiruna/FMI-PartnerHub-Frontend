import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLeftComponent } from './profile-left/profile-left.component';
import { ProfileRightComponent } from './profile-right/profile-right.component';
import { ImageSliderModule } from "../slideshow/image-slider.module";
import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations: [
        ProfileLeftComponent,
        ProfileRightComponent
    ],
    exports: [
        ProfileLeftComponent,
        ProfileRightComponent
    ],
    imports: [
        CommonModule,
        ImageSliderModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyBhU3J5kgohV9C4enjQW6g2tbzs-MAMTF8"
          })
    ]
})

export class ProfileCompModule { }