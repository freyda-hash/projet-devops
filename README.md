# Vue.js and Node.js Web Application with MySQL Database

## Getting started

In order to run **the** program locally you must add a `.env` file at the root of the project, containing the following values :

| VARIABLE | Type   | DESCRIPTION                                                   |
| -------- | ------ | ------------------------------------------------------------- |
| DB_NAME  | String | The name of the database (to be created)Le plus souvent route |
| DB_USER  | String | Most often root is the name of the MySQL user                 |
| DB_PASS  | String | MySQL user password                                           |
|

### Included in the project

#### Frontend

- [Vue.js](https://vuejs.org/)
- [State management - Vuex](https://vuex.vuejs.org/)
- [Vue routing](https://vuejs.org/v2/guide/routing.html)
- [Component design - Bootstrap Vue](https://bootstrap-vue.org/)

#### Backend

- [Node.js](https://nodejs.org/en/)
- [Express.js](http://expressjs.com/)
- [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer)
- [Authentication - Passport.js](http://www.passportjs.org/)
- [Database interfacing - Sequelize](https://sequelize.org/)

#### Database

- [MySQL](https://www.mysql.com/)

## Project Setup

### Installing server dependencies

To install server dependencies, navigate to the `server` directory using the following command:

```
cd server && npm install
```

### Installing shop dependencies

To install shop dependencies, navigate to the `client` directory using the following command:

```
cd ../client && npm install
```

### Configuring MySQL Server

Create a MySQL DB

Put the database info in the .env file at the root of the server folder

### Setting Up Environment Variables

### Check and Match Database Configuration for User, Password, and Database Information

Make sure to check and match the database configuration for user, password, and database information. You can find this configuration file at `server/src/config/config.js`.

### Feed Some Data to the Database for the Website

To add some initial data to the database for the website, run the following command:

```
cd server && npm run seed
```

### Starting the Backend Server First

Start the backend server first with the following command:

```
cd server && npm start
```

### Starting the Vue Application in Another Terminal

To start the Vue application in another terminal window, run the following command:

```
cd client && npm run serve
```

### Verify the Application is Running

Your application should be running locally on port 8080. Verify this by going to http://localhost:8080 in the web browser.

### PS

