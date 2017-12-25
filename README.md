# Obadge-backend

## Installation

1. Clone the repo
2. Rename .env.example to .env and set some environment variables
3. ```yarn``` to install dependencies.
4. ```yarn test``` to run API tests.
5. ```yarn migrate-db``` to migrate the database.
6. ```yarn seed-db``` to seed the database, creating admin user account.
7. ```yarn start```

## API routes


### ```POST /api/authentication```

#### Request body

```
{
    "email" : "user1@email.com",
    "password" : "HelloWorld" 
}
```

#### Response

HTTP 200 if correct credentials are entered


```
{
    "success" : true,
    "message" : "Authentication successful",
    "payload" : {
        "token" : "JWT_SECRET"
    }
}
```

HTTP 401 if incorrect credentials are entered

```
{
    "success" : false,
    "message" : "Authentication failure"
}
```
