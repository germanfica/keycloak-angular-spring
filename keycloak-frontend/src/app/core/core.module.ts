import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { KeycloakService } from './services/keycloak.service';
import { FooService } from './services/foo.service';
import { LoginService } from './services/login.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [
          'http://localhost:8081/api/test',
          'http://localhost:8080/api/test',
          'http://localhost:8080/foo'
        ],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    KeycloakService,
    FooService,
    LoginService,
    MessageService,
    UserService
  ]
})
export class CoreModule { }
