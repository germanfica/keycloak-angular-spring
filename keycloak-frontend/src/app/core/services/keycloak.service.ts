import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { LoginService } from './login.service';
import { MessageService } from './message.service';
import { Observable, Subject } from 'rxjs'; // https://rxjs.dev/guide/subject

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private usernameSubject: Subject<string> = new Subject();
  private isLoggedSubject: Subject<boolean> = new Subject();
  private isAdminSubject: Subject<boolean> = new Subject();
  private isReadySubject: Subject<boolean> = new Subject();
  private authConfig: AuthConfig = {
    issuer: 'http://localhost:8180/auth/realms/myrealm',
    redirectUri: window.location.origin,
    clientId: 'frontend-client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  constructor(
    private oauthService: OAuthService,
    private messageService: MessageService,
    private loginService: LoginService
  ) {
    // https://stackoverflow.com/questions/63444340/promisse-in-constructor-dont-finish-before-method-runs-in-angular-10
    this.configure();
  }

  /**
   * This method takes care configure OAuth2 login to work with Keycloak.
   */
  private configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument()
      .then(() => this.oauthService.tryLogin())
      .then(() => this.oauthService.getIdentityClaims() ? true : false)
      .then((isReady) => {
        if (isReady) {
          this.isLoggedSubject.next(this.loginService.getIsLogged()); // get is logged
          this.isAdminSubject.next(this.loginService.getIsAdmin()); // get is admin
          this.usernameSubject.next(this.loginService.getUsername()); // get username
          this.messageService.sendMessage(this.loginService.getUsername()); // send a message
          this.isReadySubject.next(isReady); // notifies that the configuration is ready
        }
      });
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  getIsLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  /**
   * Check if `configure()` method is ready.
   * 
   * @returns {Observable} An `Observable` if the `KeycloakService` was successfully configured.
   */
  isConfigureReady(): Observable<boolean> {
    return this.isReadySubject.asObservable();
  }

}
