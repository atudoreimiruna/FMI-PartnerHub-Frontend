import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLeftComponent } from './profile-left/profile-left.component';
import { ProfileRightComponent } from './profile-right/profile-right.component';
import { AgmCoreModule } from '@agm/core';
import { ImageSliderModule } from "../slideshow/image-slider.module";

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
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyAg2osjcgX8Xs-colEx3U2AsozS75gy76Y"
        }),
        ImageSliderModule
    ]
})

export class ProfileCompModule { }