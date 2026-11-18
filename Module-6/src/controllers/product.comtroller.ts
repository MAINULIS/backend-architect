import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";

// * controllers folder for controller handle
// * service folder for Database

// * /products --> GET, PUT, POST
export const productController = async(req: IncomingMessage, res: ServerResponse) => {
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

      //! Find a Product
    else if(method === "GET" && id !== null) {
        const products =  productService(); // [{},{},{}]
        const product = products.find((p:IProduct) => p.id = id)

          if(!product) {
            res.writeHead(404, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product not found!", 
        }));
        }

        res.writeHead(200, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "A single Product retrieve successfully.", data: product }));
    }

      //! Create Product
    else if(method === "POST" && url === "/products") {
        // "abcd" => "a", "b", "c" => "abc"
        const body = await bodyParser(req);
        // console.log(body);
        const newProduct = {
            id: Date.now(),
            ...body
        }
        const products =  productService(); // [{},{},{}]
        products.push(newProduct); //[{},{},{}, {new}]
        createProduct(products);
        // console.log(newProduct);

        res.writeHead(201, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product created successfully.", 
            data: newProduct 
        }));
    }
      //! Update Product
    else if(method === "PUT" && id !== null) {
        const body = await bodyParser(req);
        const products =  productService();

        const index = products.findIndex((p:IProduct) => p.id === id);
        // console.log(index);
        if(index < 0) {
            res.writeHead(404, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product not found!", 
        }));
        }

        // console.log(products[index]);
        products[index] = {id: products[index].id, ...body};
        createProduct(products);

        res.writeHead(200, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product updated successfully.", 
            data: products[index]
        }));
    }
    //! Delete Product
    else if(method === "DELETE" && id !== null) {
        const products = productService();

        const index = products.findIndex((p:IProduct) => p.id === id);
        // console.log(index);
        if(index < 0) {
            res.writeHead(404, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product not found!", 
        }));
        }

        products.splice(index, 1);
        createProduct(products);


        res.writeHead(200, { "Content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product deleted successfully."
        }));
    }


}