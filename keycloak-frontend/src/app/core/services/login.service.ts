import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private oauthService: OAuthService) { console.log("LoginService"); }

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
