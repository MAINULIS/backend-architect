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

//! Database: Neon PostgreSQL (Structured Query Language) 
// * 1. npm i pg
// PG is a Non-blocking PostgreSQL  client for Node.js.
// * 2. npm i @types/pg

import express, { type Application, type Request, type Response } from "express";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


//* Main path
app.use("/api/v1/users", userRoute);


// root route
app.get("/", (req: Request, res: Response) => {
    // console.log(req);
    res.status(200).json({
        success: true,
        message: "This is root route!",
        author: "PH",
    })
});


export default app;