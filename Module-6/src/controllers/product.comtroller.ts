import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product";

// * controllers folder for controller handle
// * service folder for Database

// * /products --> GET, PUT, POST
export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

// Get a single product
// console.log(url);
const urlParams = url?.split("/")
const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2])  :null
// console.log(id);

// get all products
    if (url === "/products" && method === "GET") {
    //     const products = [
    //     {
    //         "id": 1,
    //         "name": "product-1",
    //         "price": 100
    //     },
    //     {
    //         "id": 2,
    //         "name": "product-2",
    //         "price": 200
    //     },
    // ];

        const products =  productService();

        res.writeHead(200, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product retrieve successfully.", data: products }));

    }

    else if(method === "GET" && id !== null) {
        const products =  productService(); // [{},{},{}]
        const product = products.find((p:IProduct) => p.id = id)

        res.writeHead(200, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "A single Product retrieve successfully.", data: product }));
    }


}