# GALLERY

Gallery is a simple image sharing app that displays uploaded images using a masonry grid style layout (21.12.2023) with the number of dsiplay columns being set by the screen width for responsiveness and use on various devices.

- Uses can sign up, log in and log out.
- Un-logged in users have the same visibility as logged in users but no editing rights

**Logged in user functionality:**

- Upload images
- Like and unlike images (once per image)
- Make comments
- Delete own images

**Planned future functionality:**

- Only like other people's images
- Delete account with option of whether to leave or delete images and comments
- like and unlike other people's comments
- Comment on comments
  
## Usage

This gallery app can easily be cloned and with very limited adaption can serve as an image share for an event, holiday, wedding, etc. It seems very feasible to adapt the app so that it can have a feature to easily achive such a functionality within the main app.
**Example:** Bob and Aisha are getting married and send out a link to a `Bob and Aisha's Wedding` specific clone of this app so that all of their guests can upload images they take of the special day as the day goes on.

## Setting up the app

Clone the repo and navigate to the root directory.

cd into the frontend, install the dependencies.

```
cd frontend
npm install
```

Set up the environment variables in the frontend.
  
```
touch .env
```

Add the following to the .env file.

```
VITE_CLOUDINARY_UPLOAD_PRESET=<your-cloudinary-upload-preset>
VITE_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
```

**NOTE:** Without these environment variables, any image upload will fail.

cd into the backend, install the dependencies.

```
cd ../backend
npm install
```

You may also need to run the following depending on your environment.

```
npm install dotenv --save
npm install -g nodemon
```

Set up the environment variables in the backend.

```
touch .env
```

Add the following to the .env file.

```
MONGODB_PW=<your_password>
MONGODB_USER=<your_username>
JWT_SECRET=<your_secret>
CORS_ORIGIN=http://localhost:5173
```

**NOTE:** Without these environment variables, the app will not work.

## Running the app

To run the app, navigate to the backend directory and run the following.

```
npm start
```

This will start the backend server on `http://localhost:8080` and the frontend server on `http://localhost:5173` concurrently.

Alternatively, you can run the backend and frontend separately. Open two terminal windows and run the following in each.

```
cd backend
npm start
```
```
cd frontend
npm start
```

## Seeding the database

There a scripts to seed the database with sample data. This is intended mainly for testing purposes but can also be used to provide sample data for viewing the functionality of the app.

To seed the database, navigate to the backend directory and run the following.
```
npm run seed:test // seeds the test databse with image and user data
npm run seed:images:test // seeds the test database with image data only
npm run seed:users:test // seeds the test database with user data only
```
``` 
npm run seed:images:dev // seeds the development database with image data only
npm run seed:users:dev // seeds the development database with user data only
```
```
npm run seed:images:prod // seeds the production database with image data only
npm run seed:users:prod // seeds the production database with user data only
```

## End to end testing

There is a Java Selenium end to end test suite available for this project which used a Page Object Model and highly modular functions for maintainability.
Clone the test suite [here](https://github.com/pablisch/gallery-app-automation-test-suite).
Running inidividual tests and gaining visibility is easy when opened in Jet Brains' IntelliJ but other IDEs are available.
To run all tests in terminal, navigate to the test suite project directory and enter `gradle test`.

To run idividual tests in terminal, run:
```
gradle test --tests GalleryHomeLoggedOutTest
gradle test --tests GalleryHomeLoggedInTest
gradle test --tests GalleryNavigationTest
gradle test --tests GalleryLoginTest
gradle test --tests GallerySignupTest
gradle test --tests GallerySingleImageLoggedOutTest
gradle test --tests GalleryImageUploadTest
```

## Health endpoints for server & database

These healthpoints are designed for use with tools such as Postman.

GET `localhost:8080/api/v1.0/health/server` checks the server health and should return:

```
{
  "message": "All is good with the server but I can't speak for the database."
}
```

GET `localhost:8080/api/v1.0/health/db` checks the database connection and should return the first entry:

```
{
    "_id": "657dd5c41540a6523328504f",
    "status": "all good",
    "createdAt": "2023-12-16T16:52:20.605Z",
    "updatedAt": "2023-12-16T16:52:20.605Z",
    "__v": 0
}
```

POST `localhost:8080/api/v1.0/health/db` uses the database connection to add an entry. It takes a request body such as:

```
{
    "status": "doing great"
}
```

and should return:

```
{
    "message": "Health entry added successfully!"
}
```

## Image Feed

Uses the `react-masonry-css` library.

```
npm install react-masonry-css
```
