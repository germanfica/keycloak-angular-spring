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
    this.configure().then(
      (data) => {
        if (data) {
          this.isLoggedSubject.next(this.loginService.getIsLogged());
          this.isAdminSubject.next(this.loginService.getIsAdmin());
          this.usernameSubject.next(this.loginService.getUsername());
          this.messageService.sendMessage(this.loginService.getUsername());
          this.isReadySubject.next(data);
        }
      }
    );
  }

  private configure(): Promise<boolean> {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    return this.oauthService.loadDiscoveryDocument()
      .then(() => this.oauthService.tryLogin())
      .then(() => this.oauthService.getIdentityClaims() ? true : false);
    // .then((data) => console.log(JSON.stringify(this.oauthService.getIdentityClaims())));

    // this.isLogged = this.loginService.getIsLogged();
    // this.isAdmin = this.loginService.getIsAdmin();
    // this.username = this.loginService.getUsername();
    // this.messageService.sendMessage(this.loginService.getUsername());
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
  getIsConfigureReady(): Observable<boolean> {
    return this.isReadySubject.asObservable();
  }

}
