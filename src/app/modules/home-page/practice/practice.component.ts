import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Practice } from 'src/app/interfaces/practice';
import { PracticeService } from 'src/app/services/practice.service';

@Component({
    selector: 'practica',
    templateUrl: './practice.component.html',
    styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit  {
    public practiceId: number = 1;
    public practice!: Practice;
    public isAlert = false;
    public alertMsg!: string;

    constructor(
      private practiceService: PracticeService,
    ) { }
  
    ngOnInit() {
        this.getPractice();
    }

    resetAlert() {
        this.isAlert = false; 
      }
    
      closeAlert() {
        setTimeout(() => {
          this.isAlert = false; 
        }, 5000); 
      }

    public getPractice() : void {
    this.practiceService.getPracticeById(this.practiceId).subscribe( (result) => {
        this.practice = result;
        })
    }
    
}