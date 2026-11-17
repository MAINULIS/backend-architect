import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controllers/product.comtroller";

// * routes folder for route handle

const routeHandler = (req: IncomingMessage, res:ServerResponse) => {
    const url = req.url; // endpoints
    const method = req.method; // CURD("POST", "GET", "PUT", "PATCH")

    if(url === "/" && method === "GET"){
        // console.log("This is root route!");
        res.writeHead(200, {"Content-type": "application/json"})
        res.end(JSON.stringify({message: "This is root route"}));
    }
    else if (url?.startsWith("/products")) {
        productController(req, res);
    }
    else{
        // console.log("This is not defined");
        res.writeHead(404, {"Content-type": "application/json"})
        res.end(JSON.stringify({message: "This route is not defined"}));
    }


};

export default routeHandler;