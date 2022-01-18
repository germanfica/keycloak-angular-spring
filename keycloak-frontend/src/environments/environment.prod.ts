export const environment = {
  production: true,
  foo_api: 'http://localhost:8080/foo/',
  user_api: 'http://localhost:8080/user/',
  authConfig: {
    issuer: 'http://localhost:8180/auth/realms/myrealm',
    redirectUri: window.location.origin,
    clientId: 'frontend-client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  }
};
