import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";

// * controllers folder for controller handle
// * service folder for Database

// * /products --> GET, PUT, POST
export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;


    if (url === "/products" && method === "GET") {
        const products = [
        {
            "id": 1,
            "name": "product-1",
            "price": 100
        },
        {
            "id": 2,
            "name": "product-2",
            "price": 200
        },
    ]

        res.writeHead(200, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product retrieve successfully.", data: products }));

        productService()
    }


}