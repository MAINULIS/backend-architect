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

const server: Server = createServer( (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);
    // console.log(req.method);
    // console.log("response:", res);
    const url = req.url; // endpoints
    const method = req.method; // CURD("POST", "GET", "PUT", "PATCH")

    if(url === "/" && method === "GET"){
        // console.log("This is root route!");
        res.writeHead(200, {"Content-type": "application/json"})
        res.end(JSON.stringify({message: "This is root route"}));
    }
    else if (url?.startsWith("/products")) {
        res.end(JSON.stringify({message: "this is products route"}));
    }
    else{
        // console.log("This is not defined");
        res.writeHead(404, {"Content-type": "application/json"})
        res.end(JSON.stringify({message: "This route is not defined"}));
    }

})

server.listen(5000, () => {
    console.log("server is running!");
})