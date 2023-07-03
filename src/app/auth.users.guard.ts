import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUsersGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const roles = localStorage.getItem("roles")
    console.log(roles)
    if(roles?.includes("User") || roles?.includes("Admin") || roles?.includes("SuperAdmin")) { 
      return true;
    }
    else {
        this.router.navigate(['/login']);
        return false;
    }
  }
}