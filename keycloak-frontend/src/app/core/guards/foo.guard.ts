import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from '@core/services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class FooGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const requiredRoles = next.data['requiredRoles'];
    if (!this.keycloakService.getIsLogged()) {
      this.router.navigate(['/']);
      return false;
    }
    const realRol = this.keycloakService.getIsAdmin() ? 'admin' : 'user';
    if (requiredRoles.indexOf(realRol) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
