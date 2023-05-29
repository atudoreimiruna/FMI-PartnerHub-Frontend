import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLeftComponent } from './profile-left/profile-left.component';
import { ProfileRightComponent } from './profile-right/profile-right.component';
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
        ImageSliderModule
    ]
})

export class ProfileCompModule { }