# Obadge-backend

## Installation

1. Clone the repo
2. Rename .env.example to .env and set some environment variables
3. `yarn install` to install dependencies.
4. `yarn test` to run API tests.
5. `yarn migrate-db` to migrate the database.
6. `yarn seed-db` to seed the database, creating admin user account.
7. `yarn start`

## Installation (docker)

1. Clone the repo
2. Run `yarn install`
3. Run `yarn migrate-db` and `yarn seed-db` to migrate & seed database
4. Run `chmod +x ./run-container.sh` and `./run-container.sh`
5. Navigate to `http://localhost:8080`

## API routes

### `POST /api/authentication`

#### Request body

```json
{
  "email": "user1@email.com",
  "password": "HelloWorld"
}
```

#### Response

HTTP 200 if correct credentials are entered

```json
{
  "success": true,
  "message": "Authentication successful",
  "payload": {
    "token": "JWT_SECRET"
  }
}
```

HTTP 401 if incorrect credentials are entered

```json
{
  "success": false,
  "message": "Authentication failure"
}
```

## License

This project is licensed under GPLv3 license.

## Authors

- alehuo / Developer
