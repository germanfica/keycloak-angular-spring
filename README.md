# Angular 13 + Spring Boot 2.6.2 + OAuth 2.0 Keycloak authentication

This repository provides an angular and maven project for managing a foo’s information.

| [:sparkles: Getting Started](#getting-started) | [:rocket: Download](#download) |
| --------------- | -------- |

![keykloak_preview](https://user-images.githubusercontent.com/15948693/149616700-11c35e8a-5d2d-4d8b-a319-e0a4e02a9389.png)

## Getting Started
Follow the below instructions to get started with Guess the Number Game source code:
- [Make sure you have all Requirements](#requirements)
- [Setup Keykloak](#keycloak-getting-started)
- [Download Source Code](#download)
- Open Project in your favourite Java IDE and Enjoy!

## Requirements

Make sure you have the below requirements before starting:
- [OpenJDK 11 (LTS)](https://adoptium.net/?variant=openjdk11)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [Angular 13](https://angular.io/guide/setup-local)
- [Keycloak 16.1.0](https://www.keycloak.org/downloads)

## Download
You can get access to the source code by using one of the following ways:
- :sparkles: Download Source Code
- :fire: Clone the repository locally:
```bash
git clone https://github.com/germanfica/keycloak-angular-spring-boot.git
```

## NPM packages

- [angular-oauth2-oidc](https://www.npmjs.com/package/angular-oauth2-oidc)

## Maven dependencies

- [Spring Boot Starter Security](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security)
- [Spring Boot Starter Web](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web)
- [Project Lombok](https://mvnrepository.com/artifact/org.projectlombok/lombok)
- [Keycloak Spring Boot Default Starter](https://mvnrepository.com/artifact/org.keycloak/keycloak-spring-boot-starter)
- [Keycloak Admin REST Client](https://mvnrepository.com/artifact/org.keycloak/keycloak-admin-client)

## Maven commands

- `mvn clean`
- `mvn clean install`

## Configure application properties

Open `src/main/resources/application.properties`

```
server.port=8080

# keycloak
keycloak.realm = myrealm
keycloak.auth-server-url = http://localhost:8180/auth
keycloak.ssl-required = external
keycloak.resource = backend-client
keycloak.use-resource-role-mappings = true
keycloak.bearer-only = true
```

## Angular basic settings

Open `src/app/app.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [
          'http://localhost:8080/foo'
        ],
        sendAccessToken: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

The `http://localhost:8080/foo` URL corresponds to the backend `FooController` in our Spring Boot project.

Open `src/app/app.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keycloak-client';
  
  authConfig: AuthConfig = {
    issuer: 'http://localhost:8180/auth/realms/myrealm',
    redirectUri: window.location.origin,
    clientId: 'frontend-client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };
  
  constructor(private oauthService: OAuthService) {
    this.configure();
  }
  
  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.getIdentityClaims()) { }
      });
  }
}
```

## ⚙️ Keycloak basic settings

##### 🌍 Realm

```
Name: myrealm
```

##### 👤 Clients

```
Client ID: backend-client
Access Type: bearer-only
```

```
Client ID: frontend-client
Valid Redirect URIs: http://localhost:4200/*
Web Origins: *
```

##### 🔒 Client roles

```
Client ID: backend-client
Roles: ROLE_USER, ROLE_MODERATOR, ROLE_ADMIN
```

##### 🔒 Realm roles

```
Role Name: realm-admin
Client: backend-client
  Associated Roles: ROLE_ADMIN
```

```
Role Name: realm-user
Client: backend-client
  Associated Roles: ROLE_USER
```

##### 😲 Users

```
Username: admin
Email: admin@localhost
Roles: ROLE_USER, ROLE_MODERATOR, ROLE_ADMIN
```

```
Username: user
Email: admin@localhost
Roles: ROLE_USER
```

## Keycloak Getting Started

Get started with Keycloak. A useful getting started guide can be found in the [official documentation](https://www.keycloak.org/getting-started/getting-started-zip). But I strongly recommend you to follow the instructions below, as there are additional things we will need to do for this project.

Or alternatively, you can also watch this YouTube video [Autenticación Keycloak + Angular 10 + Spring-Boot full-stack: Parte 2](https://youtu.be/vCZXcCNppA0?list=PL4bT56Uw3S4wEZ0Sp7jrGAX8DMS-MKowg).

### Update default Keycloak port (Alternative 1 - Recommended)

The default port is `8080`. Go to `standalone/configuration/standalone.xml` in the Keycloak installation folder and look for `jboss.http.port` property. We want to change the default port to `8180`.

From this:

```xml
<socket-binding name="http" port="${jboss.http.port:8080}"/>
```

To this:

```xml
<socket-binding name="http" port="${jboss.http.port:8180}"/>
```

### Adjusting the port used by Keycloak (Alternative 2)

You can check the following articles:

- [#1 Adjusting the port used by Keycloak](https://github.com/keycloak/keycloak-documentation/blob/main/getting_started/topics/sample-app/proc-adjusting-ports.adoc).
- [#2 Adjusting the port used by Keycloak](https://www.keycloak.org/docs/13.0/getting_started/#adjusting-the-port-used-by-keycloak).

Start Keycloak server by supplying a value for the `jboss.socket.binding.port-offset` system property. This value is added to the base value of every port opened by the Keycloak server. In this example, 100 is the value.

On Linux run:

```bash
$ cd bin
$ ./standalone.sh -Djboss.socket.binding.port-offset=100
```

On Windows run:

```bash
> ...\bin\standalone.bat -Djboss.socket.binding.port-offset=100
```

And finally Confirm that the Keycloak server is running. Go to http://localhost:8180/auth/admin/ . If the admin console opens, you are ready to continue this guide.

### Start Keycloak

From a terminal open the directory keycloak-16.1.0, then to start Keycloak run the following command.

On Linux run:

```bash
bin/standalone.sh
```

On Windows run:

```bash
bin/standalone.bat
```

### Create an admin user

Keycloak does not come with a default admin user, which means before you can start using Keycloak you need to create an admin user.

To do this open http://localhost:8180/auth, then fill in the form with your preferred username and password.

### Login to the admin console

Go to the [Keycloak Admin Console](http://localhost:8180/auth/admin) and login with the username and password you created earlier.

### 🌍 Create a realm

A realm in Keycloak is the equivalent of a tenant. It allows creating isolated groups of applications and users. By default there is a single realm in Keycloak called `master`. This is dedicated to manage Keycloak and should not be used for your own applications.

Let’s create our first realm.

1. Open the [Keycloak Admin Console](http://localhost:8180/auth/admin)

2. Hover the mouse over the dropdown in the top-left corner where it says `Master`, then click on `Add realm`

3. Fill in the form with the following values:
   - Name: `myrealm`

4. Click `Create`

![add-realm](https://user-images.githubusercontent.com/15948693/149637305-ad291acb-9c3f-41ec-b7ec-099cdb34a867.png)

### 👤 Create a backend client

We will need 2 (two) clients, one for the backend and one for the frontend in our realm, so let’s create them:

1. Open the [Keycloak Admin Console](http://localhost:8180/auth/admin)

2. Click `Clients` (left-hand menu)

   - Click `Create` (top-right corner of table)

3. Fill in the form with the following values:

   - Client ID: `backend-client`

   - Client Protocol: openid-connect

4. Click `Save`

![backend-client](https://user-images.githubusercontent.com/15948693/149642178-e3187aec-09b2-4219-97bf-158f8fa42cc5.png)

The client will need a bearer-only access type. To do this:

1. Click `Settings` (top of the page)

2. Fill in the form with the following values:

   - Access Type: `bearer-only`

3. Click `Save`

![backend-client-access-type](https://user-images.githubusercontent.com/15948693/149642963-efed0552-358f-404e-b69f-08886e4ccba1.png)

### 👤 Create a frontend client

Now let's create the client for the frontend:

1. Open the [Keycloak Admin Console](http://localhost:8180/auth/admin)

2. Click `Clients` (left-hand menu)

   - Click `Create` (top-right corner of table)

3. Fill in the form with the following values:

   - Client ID: `frontend-client`

   - Client Protocol: openid-connect

4. Click `Save`

![frontend-client](https://user-images.githubusercontent.com/15948693/149642215-0154cc0c-c74b-45f8-a79b-fea0264ba384.png)

The client will need a Valid URI pattern in order to be able to redirect to after a successful login or logout. To do this:

1. Click `Settings` (top of the page)

2. Fill in the form with the following values:

   - Valid Redirect URIs: `http://localhost:4200/*`

   - Web Origins: `*`

3. Click `Save`

![Frontend-Client-Settings](https://user-images.githubusercontent.com/15948693/149643580-581879db-cf91-4571-b3a7-395396cac0a3.png)

### 🔒 Create backend client roles

Initially there are no roles in a client, so let’s create one:

1. Click `Clients` (left-hand menu)

   - Click `backend-client` (Client ID column of table)

2. Click `Roles` (top of the page)

3. Click `Add Role` (top-right corner of table)

4. Fill in the form with the following values:

   - Role Name: `ROLE_USER`

   - Web Origins: `*`

5. Click `Save`

![backend-client-user-role](https://user-images.githubusercontent.com/15948693/149645973-03de9892-f73e-47da-9b6d-10bde0346016.png)

Repeat the above steps but now with the following role names:

- `ROLE_MODERATOR`
- `ROLE_ADMIN`

### 🔒 Create realm roles

We will now need two roles for our realm. So let's create them:

#### Create `realm-admin` role

1. Open the [Keycloak Admin Console](http://localhost:8180/auth/admin)

2. Click `Roles` (left-hand menu)

   - Click `Add Role` (top-right corner of table)

3. Fill in the form with the following values:

   - Role Name: `realm-admin`

4. Click `Save`

![realm-admin](https://user-images.githubusercontent.com/15948693/149646386-e57ff40b-3f73-4d87-b78e-45dc109007ed.png)

The `realm-admin` role will need `Composite Roles` enabled, as we want to associate `backend-client` roles to it. To do this:

1. Click `Details` (top of the page)

2. Click `ON` next to `Composite Roles`

   - Select `backend-client` next to `Client Roles`

4. Add in the `Associated Roles` the following roles:

   - `ROLE_ADMIN`

![admin-composite-roles](https://user-images.githubusercontent.com/15948693/149650921-eb3b80b1-adab-4fd2-bfc2-5d16eef746f5.png)

#### Create `realm-user` role

1. Open the [Keycloak Admin Console](http://localhost:8180/auth/admin)

2. Click `Roles` (left-hand menu)

   - Click `Add Role` (top-right corner of table)

3. Fill in the form with the following values:

   - Role Name: `realm-user`

4. Click `Save`

![realm-admin](https://user-images.githubusercontent.com/15948693/149646386-e57ff40b-3f73-4d87-b78e-45dc109007ed.png)

The `realm-user` role will need `Composite Roles` enabled, as we want to associate `backend-client` roles to it. To do this:

1. Click `Details` (top of the page)

2. Click `ON` next to `Composite Roles`

   - Select `backend-client` next to `Client Roles`

4. Add in the `Associated Roles` the following roles:

   - `ROLE_USER`

![user-composite-roles](https://user-images.githubusercontent.com/15948693/149651463-d094db47-996e-4382-a800-9d0a59fa68a9.png)

### Create a user

Initially there are no users in a new realm, so let’s create one:

1. Open the [Keycloak Admin Console](http://localhost:8180/auth/admin)

2. Click `Users` (left-hand menu)

   - Click `Add user` (top-right corner of table)

3. Fill in the form with the following values:

   - Username: `myuser`

   - First Name: Your first name

   - Last Name: Your last name

4. Click `Save`

![add-user](https://user-images.githubusercontent.com/15948693/149637545-a1e7a3ce-2155-4933-b2b5-eadf1b466036.png)

The user will need an initial password set to be able to login. To do this:

1. Click `Credentials` (top of the page)

2. Fill in the `Set Password` form with a password

3. Click `ON` next to `Temporary` to prevent having to update password on first login

![set-password](https://user-images.githubusercontent.com/15948693/149637606-b03b402a-e9b8-453d-aacf-b5aba9ccf56b.png)

### Login to account console

Let’s now try to login to the account console to verify the user is configured correctly.

1. Open the [Keycloak Account Console](http://localhost:8180/auth/realms/myrealm/account)

2. Login with `myuser` and the password you created earlier

You should now be logged-in to the account console where users can manage their accounts.

![account-console](https://user-images.githubusercontent.com/15948693/149637695-4d4e355f-6b50-42d2-a6f5-f67e1ff9c349.png)

## Credits
- [German Fica](https://germanfica.com/)
- [cavanosa](https://github.com/cavanosa)
