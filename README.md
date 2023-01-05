# Skill management application

```bash
$ git clone https://github.com/Vivek0624/skill_database_app.git
$ cd backend
```
## Quick Start in [Docker](https://www.docker.com/)

> Start the app in Docker

```bash
$ docker-compose pull   # download dependencies 
$ docker-compose build  # local set up
$ docker-compose up     # start the app 
```


<br />

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Modules](#modules)
4. [Testing](#testing)
5. [Databases](#databases)

## How to use the code

**Step #1** - Clone the project

```bash
$ git clone https://github.com/Vivek0624/skill_database_app.git
$ cd backend
```

**Step #2** - create virtual environment using python3 and activate it (keep it outside our project directory)

```bash
$ # Virtualenv modules installation (Unix based systems)
$ virtualenv env
$ source env/bin/activate
$
$ # Virtualenv modules installation (Windows based systems)
$ # virtualenv env
$ # .\env\Scripts\activate
```

**Step #3** - Install dependencies in virtualenv

```bash
$ pip install -r requirements.txt
```

**Step #4** - setup `flask` command for our app

```bash
$ export FLASK_APP=run.py
$ export FLASK_ENV=development
```

> Or for Windows-based systems
```powershell
$ (Windows CMD) set FLASK_APP=run.py
$ (Windows CMD) set FLASK_ENV=development
$
$ (Powershell) $env:FLASK_APP = ".\run.py"
$ (Powershell) $env:FLASK_ENV = "development"
```

**Step #5** - start test APIs server at `localhost:5000`

```bash
$ flask run
```

**Step #6** - use `flask-restx` swagger dashboard to test APIs, or use `POSTMAN`

<br />

## Project Structure

```bash
├───backend
│   │   application.log
│   │   database.yaml
│   │   deployer.json
│   │   docker-compose.yml
│   │   Dockerfile
│   │   env.sample
│   │   gunicorn-cfg.py
│   │   models.py
│   │   requirements.txt
│   │   run.py
│   │   tests.py
│   │
│   ├───api
│   │       apidata.db
│   │       config.py
│   │       models.py
│   │       routes.py
│   │       __init__.py
│   │
│   └───nginx
│           flask_api.conf
│
└───frontend
    │   .dockerignore
    │   docker-compose.yml
    │   package-lock.json
    │   package.json
    │
    ├───public
    │   │   favicon.ico
    │   │   index.html
    │   │
    │   └───img
    │           1644503556759.png
    │           Ellipse.png
    │           loading.png
    │           package.png
    │           wave.png
    │           wave2.png
    │           wave3.png
    │
    └───src
        │   App.css
        │   App.js
        │   index.css
        │   index.js
        │   logo.svg
        │   serviceWorker.js
        │   setupTests.js
        │
        ├───components
        │       CreateUserComponent.jsx
        │       FooterComponent.jsx
        │       GetAll.jsx
        │       HeaderComponent.js
        │       httpClient.jsx
        │       landing.jsx
        │       ListUserComponent.jsx
        │       LoginPage.jsx
        │       navbarLoginReg.jsx
        │       NotFound.jsx
        │       reg.jsx
        │       RegisterPage.jsx
        │       UpdateUserComponent.jsx
        │       ViewUserComponent.jsx
        │
        ├───img
        │       Management-skills.png
        │       wave.svg
        │
        └───services
                UserService.js
```

<br />

## API



> **Register** - `api/register` (**POST** request)
```
POST api/register
Content-Type: application/json
{
    "username":"test",
    "password":"pass", 
    "email":"test@test.us"
}
```

<br />

> **Login** - `api/login` (**POST** request)
```
POST /api/login
Content-Type: application/json
{
    "password":"pass", 
    "email":"test@test.us"
}
```

<br />

> **Logout** - `api/logout` (**POST** request)
```
POST api/logout
Content-Type: application/json
authorization: JWT_TOKEN (returned by Login request)
{
    "token":"JWT_TOKEN"
}
```

<br />

## Modules

This application uses the following modules

 - Flask==1.1.4
 - flask-restx==0.4.0
 - Flask-JWT-Extended
 - pytest

## Testing

Run tests using `pytest tests.py`

## Database

Used MongoDB Atlas in backend to fetch data from MongoDB to server and display results in frontend

For Authentication module we used Sqlite in backend to store users information.

<br />

# React UI 

> Get the code
$ git clone https://github.com/Vivek0624/skill_database_app.git
$ cd frontend

## Quick Start in [Docker](https://www.docker.com/)

> Start the app in Docker
```bash
$ docker-compose pull   # download dependencies 
$ docker-compose build  # local set up
$ docker-compose up     # start the app 
```

**Step #1** - Clone the project

```bash
$ git clone https://github.com/Vivek0624/skill_database_app.git
$ cd frontend
```

<br >

**Step #2** - Install dependencies via NPM or yarn

```bash
$ npm i
// OR
$ yarn
```

<br />

**Step #3** - Start in development mode

```bash
$ npm run start 
// OR
$ yarn start
```

<br />

## Configure the backend server

The product comes with a usable JWT Authentication flow that provides only the basic requests: login/logout/register. 


<br />