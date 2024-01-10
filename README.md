# GALLERY

## Dependencies

Install the backend dependencies.

```
cd backend
npm install
```

You may also need to run the following depending on your environment.

```
npm install dotenv --save
npm install -g nodemon
```

Install the frontend dependencies.

```
cd frontend
npm install
```

## Health endpoints for server & database

These healthpoints are designed for use with tools such as Postman.

GET `localhost:8081/api/v1.0/health/server` checks the server health and should return:

```
{
  "message": "All is good with the server but I can't speak for the database."
}
```

GET `localhost:8081/api/v1.0/health/db` checks the database connection and should return the first entry:

```
{
    "_id": "657dd5c41540a6523328504f",
    "status": "all good",
    "createdAt": "2023-12-16T16:52:20.605Z",
    "updatedAt": "2023-12-16T16:52:20.605Z",
    "__v": 0
}
```

POST `localhost:8081/api/v1.0/health/db` uses the database connection to add an entry. It takes a request body such as:

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
