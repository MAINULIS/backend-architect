//! goal: create a  server with express
//*1. npm init -y  
// project initialization with nodeJS

//*2 npm install express

//*3. npm i --save-dev @types/express
// install express types

//*4. npx tsc --init
// to create a new typescript config file(tsconfig.json)
// ! to run a server
//* npm i tsx
// TypeScript Execute (tsx): is a fast, zero-configuration CLI tool and runtime enhancement for Node.js 

import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
    res.send("this is root route!")
})

app.listen(port, () => {
    console.log(`Our express app is running on port ${port}`);
})