# Cook & Taste -- Lab Course 1

## Pershkrimi i projektit

Cook & Taste eshte nje aplikacion full-stack per menaxhimin dhe shfaqjen
e recetave dhe pijeve. Projekti eshte zhvilluar si pjese e kerkesave te
lendes Lab Course 1.

Aplikacioni u mundeson perdoruesve te:
- regjistrohen dhe kycen ne sistem 
- shohin receta dhe pije sipas kategorive 
- kerkojne receta 
- ruajne receta te favorite - abonohen ne newsletter

Administratori mund te: 
- menaxhoje perdoruesit 
- menaxhoje kategorite dhe item-et 
- shoh statistika ne dashboard

## Teknologjite e perdorura

Frontend: - ReactJS - Bootstrap

Backend: - Node.js - Express - JWT - bcrypt

Databaza: - MySQL

## Funksionalitetet kryesore

### Autentifikimi

-   Register
-   Login
-   JWT token
-   Refresh token
-   Role-based access


### Dashboard

-   Statistika
-   Menaxhim users
-   Menaxhim kategorish

## Siguria

- JWT authentication
- bcrypt password hashing
- refresh tokens ne databaze
- role-based authorization
- httpOnly cookies
- protected routes

## Databaza

MySQL databaze relacionale me tabela: 
- users
- recipes
- favorites
- category_items
- subscribers
- refresh_tokens
- site_settings

## Instalo dependencies

Root:

npm install

## Backend:

cd backend
npm install

## Frontend:

cd ../frontend
npm install
## Run backend-in
cd backend
npm run dev

Backend: http://localhost:5174
##  Run frontend-in
cd frontend
npm run dev

Frontend: http://localhost:5173

