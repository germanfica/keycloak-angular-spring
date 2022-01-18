import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private isConfigureReadySubject: Subject<boolean> = new Subject();
  private authConfig: AuthConfig = {
    issuer: 'http://localhost:8180/auth/realms/myrealm',
    redirectUri: window.location.origin,
    clientId: 'frontend-client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  constructor(private oauthService: OAuthService) {
    this.configure();
    console.log("KeycloakService");
  }

  /**
   * This method takes care configure OAuth2 login to work with Keycloak.
   */
  private configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => this.oauthService.getIdentityClaims() ? true : false)
      .then((isReady) => this.isConfigureReadySubject.next(isReady));
  }

  /**
   * Check if `configure()` method is ready.
   * 
   * @returns {Observable} An `Observable` if the `KeycloakService` was successfully configured.
   */
  isConfigureReady(): Observable<boolean> {
    return this.isConfigureReadySubject.asObservable();
  }

  public login(): void {
    this.oauthService.initImplicitFlowInternal();
    //this.oauthService.initCodeFlow();
    //this.oauthService.initLoginFlow();
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getUsername(): string {
    let claims: any = this.oauthService.getIdentityClaims();
    if (!claims) return "";

    return claims['preferred_username']; // claims.preferred_username
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    let isAdmin = false;

    if (token) {
      const payload = token.split('.')[1];
      const payloadDecodedJson = atob(payload);
      const payloadDecoded = JSON.parse(payloadDecodedJson);
      // console.log(payloadDecoded.realm_access.roles);
      isAdmin = payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
    }

    return isAdmin;
  }
}
