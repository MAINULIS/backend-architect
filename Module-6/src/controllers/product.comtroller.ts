import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

// * controllers folder for controller handle
// * service folder for Database

// * /products --> GET, PUT, POST
export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    // Get a single product
    // console.log(url);
    const urlParams = url?.split("/")
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null
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

        try {
            const products = productService();

            sendResponse(res, true, 200, "Products retrieve successfully.", products);
        } catch (error) {
            sendResponse(res, false, 500, "Internal server Error")
        }

    }

    //! Find a Product
    else if (method === "GET" && id !== null) {
        try {
            const products = productService(); // [{},{},{}]
            const product = products.find((p: IProduct) => p.id = id)

            if (!product) {
                return sendResponse(res, false, 404, "Product not found!");
            }
            sendResponse(res, true, 200, "Product retrieve successfully.", product);
            
        } catch (error) {
            sendResponse(res, false, 500, "Internal server Error")
        }
    }

    //! Create Product
    else if (method === "POST" && url === "/products") {
        // "abcd" => "a", "b", "c" => "abc"
        const body = await bodyParser(req);
        // console.log(body);
        const newProduct = {
            id: Date.now(),
            ...body
        }
        const products = productService(); // [{},{},{}]
        products.push(newProduct); //[{},{},{}, {new}]
        createProduct(products);
        // console.log(newProduct);

        try {
            sendResponse(res, true, 201, "Product created successfully.", newProduct);
        } catch (error) {
            sendResponse(res, false, 500, "Internal server Error")
        }
    }
    //! Update Product
    else if (method === "PUT" && id !== null) {

        try {
        const body = await bodyParser(req);
        const products = productService();
        const index = products.findIndex((p: IProduct) => p.id === id);
        if (index < 0) {

            sendResponse(res, false, 404, "Product not found!")
        }
        // console.log(products[index]);
        products[index] = { id: products[index].id, ...body };
        createProduct(products);

        sendResponse(res, true, 200, "Product updated successfully.", products[index]);
            
        } catch (error) {
            sendResponse(res, false, 500, "Internal server Error")
        }
        
    }
    //! Delete Product
    else if (method === "DELETE" && id !== null) {

        try {
        const products = productService();
        const index = products.findIndex((p: IProduct) => p.id === id);

        if (index < 0) {

            sendResponse(res, false, 404, "Product not found!")
        }

        products.splice(index, 1);
        createProduct(products);

        sendResponse(res, true, 200, "Product deleted successfully!");
            
        } catch (error) {
            sendResponse(res, false, 500, "Internal server Error")
        }
        
    }


}