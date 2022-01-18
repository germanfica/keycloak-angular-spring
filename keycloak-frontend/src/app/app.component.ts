import { LoginService } from '@core/services/login.service';
import { MessageService } from '@core/services/message.service';
import { AuthConfig, OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
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

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private keycloakService: KeycloakService
  ) {



    // this.isLogged = this.keycloakService.isLogged;
    //       this.isAdmin = this.keycloakService.isAdmin;
    //       this.username = this.keycloakService.username;
    //       this.messageService.sendMessage(this.keycloakService.username);

    // this.keycloakService.getIsLogged().subscribe((data) => {
    //   this.isLogged = data;
    // });

    // this.keycloakService.getIsAdmin().subscribe((data) => {
    //   this.isAdmin = data;
    // });

    // this.keycloakService.getUsername().subscribe((data) => {
    //   this.username = data;
    //   console.log(data);
    // });

    this.keycloakService.getIsConfigureReady().subscribe((data) => {
      if (data) {
        this.isLogged = this.loginService.getIsLogged();
        this.isAdmin = this.loginService.getIsAdmin();
        this.username = this.loginService.getUsername();
        this.messageService.sendMessage(this.loginService.getUsername());
      }
    });

  }



}
