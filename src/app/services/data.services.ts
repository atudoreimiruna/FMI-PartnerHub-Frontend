import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  public currentMessage = this.messageSource.asObservable();

  private userSource = new BehaviorSubject({
    username:'',
    password:'',
  });

  public currentUser = this.userSource.asObservable();
  constructor() { }

  public changeUserData(user: any): void{
    this.userSource.next(user);
  }

  public changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
