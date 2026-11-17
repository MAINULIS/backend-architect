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


import { createServer } from "http";
const server = createServer( (req, res) => {
    console.log(server);

})

server.listen(5000, () => {
    console.log("server is running!");
})