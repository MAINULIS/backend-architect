//! goal: create a  server with express
//*1. npm init -y  
// project initialization with nodeJS

//*2 npm install express

//*3. npm i --save-dev @types/express
// install express types

//*4. npx tsc --init
// to create a new typescript config file(tsconfig.json)
// ! to run a server
//* npm i tsx
// TypeScript Execute (tsx): is a fast, zero-configuration CLI tool and runtime enhancement for Node.js 

//! Database: Neon PostgreSQL (Structured Query Language) 
// * 1. npm i pg
// PG is a Non-blocking PostgreSQL  client for Node.js.
// * 2. npm i @types/pg

import express, { type Application, type Request, type Response } from "express";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


// root route
app.get("/", (req: Request, res: Response) => {
    // console.log(req);
    res.status(200).json({
        success: true,
        message: "This is root route!",
        author: "PH",
    })
});

//* Inserted users data to bd
app.use("/api/v1/users", userRoute);


//* get all users (fetch) data from DB
app.get("/api/v1/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT * FROM users
        `)
        // console.log(result);
        if(result.rowCount === 0) {
            res.status(404).json({
            success: false,
            message: " User Not Found !"
        });
        }

        res.status(200).json({
            success: true,
            message: "Users data retrieved successfully !",
            data: result.rows
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        });
    }
});

//* Get single user data
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        // const id = req.params.id
        const { id } = req.params;

        const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
        `, [id],
        );

        //  console.log(result.rows[0].email);
        if(result.rowCount === 0) {
            res.status(404).json({
            success: false,
            message: " User Not Found !"
        });
        }

        res.status(200).json({
            success: true,
            message: "User data retrieved successfully !",
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        });
    };
});


//* Update a user
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, password, age, is_active } = req.body;

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

        if(result.rowCount === 0) {
            res.status(404).json({
            success: false,
            message: " User Not Found !"
        });
        }

        res.status(200).json({
            success: true,
            message: "User data updated successfully !",
            data: result.rows[0]
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        });
    }
});

//* Delete a user
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `, [id]
        );

        if(result.rowCount === 0) {
            res.status(404).json({
            success: false,
            message: " User Not Found !"
        });
        }

        res.status(200).json({
            success: true,
            message: "The User Deleted successfully !"
        });

        // console.log(result);

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        });
    }
})


export default app;