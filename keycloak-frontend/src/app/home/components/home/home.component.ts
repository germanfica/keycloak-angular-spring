import { Component, OnInit } from '@angular/core';
import { LoginService } from '@core/services/login.service';
import { KeycloakService } from '@core/services/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    this.username = this.loginService.getUsername();
    console.log("HomeComponent ngOnInit");
  }
}
