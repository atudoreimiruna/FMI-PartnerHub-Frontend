import { NgModule } from "@angular/core";
import { JobLeftComponent } from "./job-left/job-left.component";
import { JobRightComponent } from "./job-right/job-right.component";
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    JobLeftComponent,
    JobRightComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    JobLeftComponent,
    JobRightComponent
  ]
})

export class JobCompModule { }