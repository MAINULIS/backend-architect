// * cwd--> current working directory
//  File System
import fs from "fs";
import path from "node:path";
import type { IProduct } from "../types/product";

const filePath = path.join(process.cwd(), "./src/database/db.json")
export const productService = () =>{
    // console.log(process.cwd());
    // console.log(filePath)
    const result = fs.readFileSync(filePath, "utf-8");
    // console.log(result.toString());
    console.log(result);

    return JSON.parse(result);
};

// writing data on bd
export const createProduct = (payload: IProduct[]) => {
    fs.writeFileSync(filePath, JSON.stringify(payload));
}