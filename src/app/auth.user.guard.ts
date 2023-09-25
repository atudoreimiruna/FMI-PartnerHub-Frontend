import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const roles = localStorage.getItem("roles")
    if(roles?.includes("User")) { 
      return true;
    }
    else {
        this.router.navigate(['/login']);
        return false;
    }
  }
}