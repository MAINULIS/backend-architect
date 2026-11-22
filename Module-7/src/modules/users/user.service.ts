import { pool } from "../../db";
import type { IUser } from "./user.interface";

// all logic in this file
const createUserIntoDB = async (payload:IUser) => {
    // console.log(req.body);
    const { name, email, password, age } = payload;

    const result = await pool.query(`
        INSERT INTO users (name, email, age, password) VALUES($1, $2, $3, $4) RETURNING *
        `,
        [name, email, age, password],
    );

    return result;

    // console.log(result);
}

export const userService = {
    createUserIntoDB
}