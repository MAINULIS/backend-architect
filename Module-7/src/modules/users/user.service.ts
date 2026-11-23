import { pool } from "../../db";
import type { IUser } from "./user.interface";

// all logic in this file

const createUserIntoDB = async (payload: IUser) => {
    // console.log(req.body);
    const { name, email, password, age } = payload;

    const result = await pool.query(`
        INSERT INTO users (name, email, age, password) VALUES($1, $2, $3, $4) RETURNING *
        `,
        [name, email, age, password],
    );

    return result;

    // console.log(result);
};

const getAllUsersFromDB = async () => {
    const result = await pool.query(`
            SELECT * FROM users
        `)
    // console.log(result);
    return result;
};

const getSingleUserFromDB = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
        `, [id],
    );
    return result;
};

export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
}