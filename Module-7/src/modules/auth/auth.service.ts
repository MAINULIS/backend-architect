
import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (payload: {email:string, password:string}) => {

    const {email, password} = payload;
    // check if the user exists
    // check if the password matched
    // check the user status
    // if pass then generate jwt(json web token)

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email],
    );

    // console.log(user.rows[0]);
        if(user.rowCount === 0) {
            throw new Error("Invalid credentials!")
        }

        const matchPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!matchPassword) {
            throw new Error("Invalid credentials!!")
        }
        
        if(!user.rows[0].is_active) {
            throw new Error("Access denied!")
        }

        // const userId = user.rows[0].id;
        // const userName = user.rows[0].name;
        // const userEmail = user.rows[0].email;

        const jwtPayload = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email
        };

        const accessToken = jwt.sign(jwtPayload, "kdf823@ud7^fsj8734jf", {expiresIn: "1d"});

        return {accessToken, user: user.rows[0]};

};


export const authService = {
    loginUserIntoDB
};