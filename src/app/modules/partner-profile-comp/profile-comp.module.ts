import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLeftComponent } from './profile-left/profile-left.component';
import { ProfileRightComponent } from './profile-right/profile-right.component';
import { ImageSliderModule } from "../slideshow/image-slider.module";
import { MapsComponent } from '../maps/map-comp/maps.component';
import { MapModule } from '../maps/maps.module';

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
        MapModule
    ]
})

export class ProfileCompModule { }