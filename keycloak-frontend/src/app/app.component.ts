import { Component } from '@angular/core';
import { KeycloakService } from '@core/services/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keycloak-client';

  username: string = "";
  isLogged: boolean = false;
  isAdmin: boolean = false;

  constructor(private keycloakService: KeycloakService) {
    this.keycloakService.getIsLogged().subscribe((data) => this.isLogged = data);
    this.keycloakService.getIsAdmin().subscribe((data) => this.isAdmin = data);
    this.keycloakService.getUsername().subscribe((data) => this.username = data);

    this.keycloakService.isConfigureReady().subscribe((data) => {
      if (data) {
        console.log("READYYY");

        //this.messageService.sendMessage(this.loginService.getUsername());
      }
    });
  }
}
