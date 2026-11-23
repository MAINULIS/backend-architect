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

// get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB();

        if (result.rowCount === 0) {
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
};

// get a single user
const getSingleUser = async (req: Request, res: Response) => {
    try {
        // const id = req.params.id
        const { id } = req.params;

        const result = await userService.getSingleUserFromDB(id as string);

        //  console.log(result.rows[0].email);
        if (result.rowCount === 0) {
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
};

// update a user
const updateAUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.updateAUserFromDB(req.body, id as string)

        if (result.rowCount === 0) {
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
};

//* Delete a user
const deleteAUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await userService.deleteAUserFromDB(id as string);

        if (result.rowCount === 0) {
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
};

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateAUser,
    deleteAUser,
}
