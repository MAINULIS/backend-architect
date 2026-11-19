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

import express, { type Application, type Request, type Response } from "express";

const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res:Response) => {
    console.log(req);
    res.status(200).json({
        success: true,
        message: "This is root route!",
        author: "PH",
    })
})

app.post("/", async(req: Request, res:Response) => {
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Our express app is running on port ${port}`);
})