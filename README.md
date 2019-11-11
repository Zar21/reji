# reji

Web page with multiple dockerized backends and an AngularJS 1.5 frontend.  
MEAN architecture project developed by **R**aül, **E**than, **J**ordi and **I**ván.

---

## Getting started

To get the repo running locally:

- Clone this repo
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- Install Docker Community Edition
- Run `installation.sh` if Linux or `npm install in each backend/x folder and frontend/ folder`
- `docker-compose up` in backend/

<small>untested</small>

---

## Features

| Page | Features |
| - | - |
| Home | List with Prisma |
| Restaurants | List with GraphQL, Details with GraphQL |
| Hotels | List with REST, Details with REST |
| Adventures | List with REST, Details with REST |
| Contact | Form to email an admin |
| Profile | User info, favourited adventures |

<br>

| Service | Features |
| - | - |
| Register | Regular register or login with GitHub or Google |
| Login | Regular login or login with GitHub or Google |
| Favourites | Favourite button with adventures, favourited show up on profile |

<br>

| Technical Feature | Where it works |
| - | - |
| Authentication | Restaurant details requires a signed in user |
| Favourites | Adventures list and the user's profile |
| Backend Communication | Hotel details requests the restaurants in the same city from the GraphQL backend |
| GraphQL (Apollo Server and Client) | Restaurant list and details, City search |
| PrismaJS | Home list |
| Docker | Entire backend is dockerized |
| Relational data | All the data uses or is used in another |
| Seed | Faker.js fills out Mongo with 50 of each model |

---

### Technologies used

* node.JS
* AngularJS 1.5
* GraphQL
* PrismaJS
* Docker
* Mongo

### Other technologies used

* Conduit - starting template
* Google Maps API
* Mailgun
* JWT 
* Bootstrap
* Toaster
* FakerJS
* Gulp
* Swagger
* PassportJS

---

## Backend Application Structure

- `rest` - The REST backend, works on Express, mostly based off Thinkster's Conduit node.JS example.
- `graphql` - The GraphQL backend, works on Express with an Apollo Server routing on /api and /api/graphqlauth (for authorization headers).
- `prisma` - The PrismaJS backend, works on GraphQL-Yoga with the prisma client generated from the prisma docker container.

- `[rest or graphql]/app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `[rest or graphql]/config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `[rest or graphql]/routes/` - This folder contains the route definitions for our API.
- `[rest or graphql]/models/` - This folder contains the schema definitions for our Mongoose models.
- `graphql/graphql/resolvers` - This folder contains the resolver definitions for our GraphQL server.
- `graphql/graphql/schemas` - This folder contains the schema definitions for our GraphQL server.
- `prisma/src/resolvers` - This folder contains the resolver definitions for our Prisma server.
- `prisma/src/schema.graphql` - This folder contains the schema definitions for our Prisma server.
- `prisma/src/app.js` - The entry point to our application. This file defines our graphql-yoga server. It also requires the schemas and resolvers we'll be using in the application.

## Frontend Application Structure

- `spec` - Jasmine testing.
- `src` - Main frontend code in AngularJS 1.5.

- `src/js/components` - This folder contains our component helpers.
- `src/js/services` - This folder contains our services for each module.
- `src/js/app.js` - The entry point to our application. This file defines our AngularJS application.

---

#### TODO 
- [ ] MoleculerJS integration
- [ ] Fill home with information from every backend
