import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Verifica si el token está presente en localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token existe, permite el acceso
      return true;
    } else {
      // Si no hay token, redirige a la página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
