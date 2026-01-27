import { Request, Response } from "express";
import { userService } from "./user.service";
import { CreateUserDto } from "./user.dto";


export const userController = {

  getAllUsers: async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json(users);
  },

  create: async (req: Request, res: Response) => {
    const user = await userService.create(req.body as CreateUserDto);
    res.json(user);
  },

  getOneUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const user = await userService.getOneUser(id as string);
    res.json(user);
  },

  updateUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const user = await userService.updateUser(id as string, req.body as CreateUserDto);
    res.json(user);
  },

  deleteUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const user = await userService.deleteUser(id as string);
    res.json(user);
  },

};

