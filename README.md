# Staff Management

This project is a simplistic demo of a web-based staff management system, featuring a React based fornt-end UI, user authentication and basic data management using JSON.

All the pages and server are written in modules using TypeScript, allowing for reuse and expansion.


### Deploy Instructions

#### Be sure to have Node.js installed before you start this process


Clone this repository, then install server dependencies using the following command:
```js
cd server
npm install
```
Compile server TypeScript file to JavaScript
```js
npm start
```
Install front-end dependencies
```js
cd fe
npm install
```
Build front-end code
```js
npm run build
```
Locate `/server/dist/server.js`, and run the code using Node.js

Open `localhost:3001` in your browser

The default username and passwords are as follows

username：`admin`

password: `1234`

There are 10 pieces of data built in the server for functionality testing.