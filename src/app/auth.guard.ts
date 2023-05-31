import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log("lksdnfjknszdjkfn")
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false; 
    }
    return true;
  }

  canUserActivate(): boolean {
    const roles = localStorage.getItem("roles")
    if(roles?.includes("User")) { 
      return true;
    }
    return false;
  }
}