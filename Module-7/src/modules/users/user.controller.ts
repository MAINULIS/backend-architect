import { type Request, type Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        
        const result = await userService.createUserIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: "User created!",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        });
    }

}

export const userController = {
    createUser
}