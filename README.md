# person-crud-api

### API Deployment URL: 
* https://people-crud-api.herokuapp.com/

API Features:
- Create a Person
- Edit a Person with its id
- Get all persons
- Get a single person with its id
- Delete a person with its id


### API Documentation
The Documentation for the Persons Restful API: 
[Persons Restful API Documentation](https://app.swaggerhub.com/apis/Kenec/person-crud-api/1.0.0)

## TECHNOLOGIES
 
#### Backend
The Backend was implemented using: 
 * [Node](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
 * [Express](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework 
 * [MongoDB](https://www.mongodb.com/) MongoDB is a NoSQL database

### INSTALLATION
  * install [Node js](https://nodejs.org/en/) and [Mongo](https://www.mongodb.com/)
  * Clone the repository `git clone https://github.com/Kenec/person-crud-api.git`
  * Navigate to the location in your terminal
  * Run $ npm install to install dependencies
  * Setup MongoDB, create a database person
  * Create a .env file in your root directory and follow the pattern in the [.env_example]
  * Run $ npm run start:dev to get the app started on your local machine
  
## TESTING
#### Server side
To run tests for the server side
* Navigate to the project location in your terminal
* Run `npm run test`

## Limitations
* The latency of returning a data from the database can be reduced by using Redis for caching
* Cannot create bulk Person objects
* Cannot delete bulk Person objects

## Authors
* Kenechukwu Nnamani

## Licence 
[MIT License](https://github.com/Kenec/person-crud-api/blob/master/LICENSE)


