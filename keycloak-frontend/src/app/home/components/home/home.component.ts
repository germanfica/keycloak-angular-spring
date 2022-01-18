import { Component, OnInit } from '@angular/core';
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
  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.keycloakService.afterTryLogin().subscribe(() => this.username = this.keycloakService.getUsername()); // After KeycloakService configure()
    this.username = this.keycloakService.getUsername(); // Before KeycloakService configure()
    console.log("HomeComponent ngOnInit");
  }
}
