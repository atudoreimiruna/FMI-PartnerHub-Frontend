import { NgModule } from "@angular/core";
import { JobLeftComponent } from "./job-left/job-left.component";
import { JobRightComponent } from "./job-right/job-right.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    JobLeftComponent,
    JobRightComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    JobLeftComponent,
    JobRightComponent
  ]
})

export class JobCompModule { }