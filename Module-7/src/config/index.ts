import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve(process.cwd(), ".env")});

const config = {
    dbString: String(process.env.DBString),
};


export default config;