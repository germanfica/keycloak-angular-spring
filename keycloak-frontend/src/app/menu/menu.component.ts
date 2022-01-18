import { LoginService } from '@core/services/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { KeycloakService } from '@core/services/keycloak.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  username: string = "";

  /**
   * Inject services.
   * 
   * Important: `LoginService` depends on `KeycloakService`.
   * 
   * @param keycloakService is the service that takes care of setting up OAuth with Keycloack.
   * @param loginService is the service that handles the basic information of the authentication system.
   */
  constructor(private keycloakService: KeycloakService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLogged = this.loginService.getIsLogged();
    this.isAdmin = this.loginService.getIsAdmin();
    this.username = this.loginService.getUsername();

    console.log("MenuComponent ngOnInit");
  }

  public login(): void {
    this.loginService.login();
  }

  public logout(): void {
    this.loginService.logout();
  }
}
