import Express from "express";
import userController from "./user.controller";

const ExpressRouter = Express.Router;

const router = ExpressRouter();

router.get("/", userController.getAllUsers);

router.post("/", userController.create);

router.get("/:id", userController.getOneUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
