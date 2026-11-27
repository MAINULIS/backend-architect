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

//! // npm i bcrypt.js: for hashing password

//! install jwt
//1. npm install jsonwebtoken
// 2.npm i @types/jsonwebtoken

import express, { type Application, type Request, type Response } from "express";
import { userRoute } from "./modules/users/user.route";
import { profileRouter } from "./modules/profiles/profile.route";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


//* Main path for users
app.use("/api/v1/users", userRoute);

//* main path for profile
app.use("/api/v1/profiles", profileRouter)

//* authentication route
app.use("/api/v1/auth", authRoute)


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