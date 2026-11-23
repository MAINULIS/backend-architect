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

const updateAUserFromDB = async(payload: Partial<IUser>, id: string) => {

    const { name, password, age, is_active } = payload;

        const result = await pool.query(`
            UPDATE users 
            SET 
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            age = COALESCE($3, age),
            is_Active = COALESCE($4, is_Active),
            updated_at = NOW()
            WHERE id=$5 RETURNING *
            `,
            [name ?? null, password ?? null, age ?? null, is_active ?? null, id],
        );
        return result;
};

const deleteAUserFromDB = async(id: string) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `, [id]
        );

        return result;
}

export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateAUserFromDB,
    deleteAUserFromDB
}