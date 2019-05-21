This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
*node server/server.js*
Runs the app from the node server.js file.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run dev-server`

Runs the front-end only on http://localhost:8080. Page will reload with edits.

### `npm run build:dev`

Builds the app in developer mode (larger bundle.js but faster build time. Includes dev dependencies).

### `npm run build:prod`

Builds the app in production mode (smaller bundle.js but longer build time. Does not include dev dependencies).


## About the App
Currently deployed on Heroku here
https://gleitsmann-expense-app.herokuapp.com/

If you want to deploy the app you MUST change the API Endpoint route in the Redux Action files. 
/src/actions/ -> expenses.js & users.js

React.js web application that utilizes the Webpack asset bundler, Redux, Node.js, Google OAuth, MongoDB w/ Mongoose, BCrypt, and Passport.

This may seem like overkill for such a simple app. Allow me to dissect why each of these components is essential to making this application fluid. 

Webpack is an asset bundler that allows us to execute a single javascript file (bundle.js) that includes all of the app dependencies, styles, and components. Rather than having an index.html that has to load multiple scripts and styles, it only has to load the bundle. 

Redux is a simple way to store the state of the application while keeping all the components loosely coupled. By using redux, I didn't have to focus on passing properties around from component to component. Also, this allows the app to continue displaying information to the user even when connection is lost. Instead of making multiple queries to the database to retrieve expenses, the application only needs to make one and store the results in the redux "store". 

Node.js is how I chose to deploy the server-side of my application, how I chose to define my API Endpoints and how I chose to establish my MongoDB connection. Without the Node, user-specific data would not persist in this application.

Google OAuth allows for an easy and secure way to sign-up for an expense account. It validates access tokens (JWT) rather than emails & passwords to provide safe and secure commuinication to the application. 

MongoDB is the database service I chose to house all the application users and their expenses. I utilize Mongoose middleware because it allows for easy to understand schema validation/authentication and database queries. Upon logging in, the expenses are pulled from the particular user from the database and stored in the redux store.

Bcrypt was something I debated on even listing here since it's such a tiny module that does not require a lot of code to be written for it. However the application does house users and users do have passwords. Bcrypt allows the application to hash a password using a salt so that if there was ever the predicament that the MongoDB was no longer secure, the accounts would still be safe. 

Passport is the module I used for validating users before returning their access_token & data to the front-end. What the server does, in essence, is exchange an email & password for a json web token (w/ oauth the application is given an google plus token. Passport uses particular "strategies" (ie. local or google oauth) to validate these tokens and respond to the front-end request with the desired user.
*Email&Passsord --> Token --> Passport validates --> User that corresponds to token*
*                                               |--> Null                          *



Higher Level Application Overview

Server is setup in a Model-View-Controller way where our models are our database schemas, views are our API Endpoints, and the controllers are the logic behind what will be executed upon reaching an API Endpoint. 

The Front-End has a lot of moving pieces. Almost any react application will have components. These are the pages that compose the application. You'll find all the application components inside the component folder in /src/components/
The routing for these components are held in /src/AppRouter.js
The Redux is split into 4 folders; Actions, Reducers, Selectors and Store. 
  Actions define what properties from the components need to be dispatched to the redux reducers.
  Reducers take the properties from the Actions and "modifies" them based off the "Type" (passed in by Actions).
  Store recieves the modified properties from the reducers and updates its state accordingly. 
  Selectors filters our Redux Store state to display only the data the user might want. 
The styling is done with saas/scss and is all held in the styles folder /src/styles/


