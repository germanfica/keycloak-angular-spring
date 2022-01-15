# Angular 13 + Spring Boot 2.6.2 + Keycloak authentication

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

## Maven commands

- `mvn clean`
- `mvn clean install`

## Keycloak Getting Started

Get started with Keycloak. You can find this guide in the [official documentation](https://www.keycloak.org/getting-started/getting-started-zip).

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

To do this open http://localhost:8080/auth, then fill in the form with your preferred username and password.

### Login to the admin console

Go to the [Keycloak Admin Console](http://localhost:8080/auth/admin) and login with the username and password you created earlier.

### Create a realm

A realm in Keycloak is the equivalent of a tenant. It allows creating isolated groups of applications and users. By default there is a single realm in Keycloak called `master`. This is dedicated to manage Keycloak and should not be used for your own applications.

Let’s create our first realm.

1. Open the [Keycloak Admin Console](http://localhost:8080/auth/admin)

2. Hover the mouse over the dropdown in the top-left corner where it says `Master`, then click on `Add realm`

3. Fill in the form with the following values:
   - Name: `myrealm`

4. Click `Create`

![add-realm](https://user-images.githubusercontent.com/15948693/149637305-ad291acb-9c3f-41ec-b7ec-099cdb34a867.png)

### Create a user

Initially there are no users in a new realm, so let’s create one:

1. Open the [Keycloak Admin Console](http://localhost:8080/auth/admin)

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

## Credits
- [German Fica](https://germanfica.com/)
- [cavanosa](https://github.com/cavanosa)
