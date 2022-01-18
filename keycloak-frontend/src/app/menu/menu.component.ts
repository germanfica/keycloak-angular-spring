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
  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.keycloakService.isConfigureReady().subscribe(() => {
      this.isLogged = this.keycloakService.getIsLogged();
      this.isAdmin = this.keycloakService.getIsAdmin();
      this.username = this.keycloakService.getUsername();
    });

    console.log("MenuComponent ngOnInit");
  }

  public login(): void {
    this.keycloakService.login();
  }

  public logout(): void {
    this.keycloakService.logout();
  }
}
