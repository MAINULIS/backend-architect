import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

//* .api/v1/users
router.post("/", userController.createUser);

//* get all users
router.get("/", userController.getAllUsers);

//* get a single user
router.get("/:id", userController.getSingleUser);

//* update a user data
router.put("/:id", userController.updateAUser);

//* Delete a user
router.delete("/:id", userController.deleteAUser);

export const userRoute = router;