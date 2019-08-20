#!/bin/sh

echo &pwd

#-> intitiate npm and install dependencies
#npm init
#npm i express body-parser mongoose concurrently
#npm i -D nodemon

#-> start server
#npm run server

#-> create react boiler plate app
#create-react-app client

#-> Run server and client concurrently
cd server
npm run dev

#-> install react dependencies
#cd client
#npm i bootstrap reactstrap uuid react-transition-group
#npm install -D babel-loader @babel/core @babel/preset-env webpack
#npm install react-transition-group --save

#-> install redux
#cd client
#npm i redux react-redux redux-thunk

#-> install axios to connect to back-end
#cd client
#npm i axios

#-> include JWT
#cd server
#npm remove body-parser
#npm i bcryptjs

#-> include JWT and config
#cd server
#npm i jsonwebtoken
#npm i config

# curl --request POST \
#   --url http://localhost:5000/api/auth/user \
#   --header 'Accept: */*' \
#   --header 'Accept-Encoding: gzip, deflate' \
#   --header 'Cache-Control: no-cache' \
#   --header 'Connection: keep-alive' \
#   --header 'Content-Length: ' \
#   --header 'Content-Type: application/json' \
#   --header 'Host: localhost:5000' \
#   --header 'User-Agent: PostmanRuntime/7.15.2' \
#   --header 'cache-control: no-cache' \
#   --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNWEwZjBiNDEyMDcxMTIzN2ZmNzc0MCIsImlhdCI6MTU2NjE4MzE3OSwiZXhwIjoxNTY2MTg2Nzc5fQ.LvpDTADBxsSERJ3bALI9hTrA4aevnq3QbHbSjhSyqNA'
