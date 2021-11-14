# engBenchmarking

This an app currently runs locally and returns percentile of candidate's score based to webpage on based on user's inputs.

## Start

1. run `npm install` to install all packages
2. create database named `benchmarking` in PostgreSQL
3. run `npm run test` to test and see cases
3. run `npm run seed` to extract, sync and seed csv data to database 
4. run `npm run start:dev` to start server and build client side files using webpack.
5. app is running on http://localhost:8080/

## Test Cases

1. =
2. if there is no user's input, it returns "Deliciousgenix，Deliciouszilla，Fodder Table，Dished Grill，Sizzle Yummy“



## Back End 

1. Database
    - PostgreSQL database
    - Sequelize to provide ORM between PostgreSQL and backend
        - create two tables companies and scoreRecords
        - join tables using Sequelize associations
        - no columns allows null value
    - Extract Data from CSV using papaparse lib
        - extract data from csv files & save to variables
        - sync and seed to database using sequelize

2. Api
    - JavaScript & express framework to create server & api

## Front End

- Webpack to build client side
- Babel to convert ECMAScript to backwards JavaScript
- React to build UI
- axios to send HTTP request to server


## Filter list of candidates

- Front End Effort
    - pre-define mix & max of candidate id prevent invalid data input

   
- Back End Effort
     - function location:
        - server/api/index.js
        - server/db/models/company.js
        - server/db/models/scorRecord.js

    1. Find candidate's company's fractal_index using candidate's id
    2. Find all companies whose fractal_index is greater than candidate's company's fractal_index-0.15 and smaller than candidate's company's fractal_index +0.15
    3. Find all candidates with the same title and working at company from above company list
    4. Compute communication score percentile and & code score percentile



