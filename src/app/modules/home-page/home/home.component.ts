import { Component } from '@angular/core';
import { Slide } from 'src/app/interfaces/slide';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  slides: Slide[] = [
    { url: 'https://images.indianexpress.com/2019/10/study1.jpg', title: 'image1'},
    { url: 'https://static-cse.canva.com/blob/558511/studyingtips1.jpg', title: 'image2'},
    { url: 'https://gradepowerlearning.com/wp-content/uploads/2018/09/how-to-use-self-study-860x420.jpeg', title: 'image3'}
  ];
}