#!/bin/bash
echo "npm install on frontend"
npm --prefix frontend install &
echo "npm install on prisma"
npm --prefix backend/prisma install &
echo "npm install on rest"
npm --prefix backend/rest install &
echo "npm install on graphql"
npm --prefix backend/graphql install