#!/bin/sh
docker build . -t obadge-backend
docker run -d -p 8080:8080 -v "$(pwd)/database.sqlite:/backend/database.sqlite" -v "$(pwd)/connect-session-knex.sqlite:/backend/connect-session-knex.sqlite" obadge-backend