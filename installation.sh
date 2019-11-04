#!/bin/bash
(cd frontend && npm install &)
(cd backend/prisma && npm install &)
(cd backend/rest && npm install &)
(cd backend/graphql && npm install &)
