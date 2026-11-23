import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

//* .api/v1/users
router.post("/", userController.createUser);

//* get all users
router.get("/", userController.getAllUsers);

//* get a single user
router.get("/:id", userController.getSingleUser);

export const userRoute = router;