//! goal: create a raw server with raw nodejs
//*1. npm init -y  
// project initialization with nodeJS

//*2. npm i -D typescript
// install typescript with devDependencies

//*3. npx tsc --init
// to create a new typescript config file(tsconfig.json)

//*4. npm install -D @types/node
// to get nodes js type suggestion on typescript file

// ! to run a server
//* npm i tsx
// TypeScript Execute (tsx): is a fast, zero-configuration CLI tool and runtime enhancement for Node.js 

// * Request --> IncomingMessage
// * Response --> ServerResponse

// ! Content-type":
//* "text/plain, application/json


import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routeHandler from "./routes/route";

const server: Server = createServer( (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
    
})

server.listen(5000, () => {
    console.log("server is running!");
})