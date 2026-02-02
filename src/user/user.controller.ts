import { Request, Response } from "express";
import userService from "./user.service";
import { CreateUserDto } from "./user.dto";


class userController {

  static getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
      status: true,
      message: 'Users fetched successfully',
      data: users
    });
  }

  static create = async (req: Request, res: Response) => {
    const user = await userService.create(req.body as CreateUserDto);
    res.status(201).json({
      status: true,
      message: 'User created successfully',
      data: user
    });
  }

  static getOneUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const user = await userService.getOneUser(id as string);
    res.status(200).json({
      status: true,
      message: 'User fetched successfully',
      data: user
    });
  }

  static updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const user = await userService.updateUser(id as string, req.body as CreateUserDto);
    res.status(200).json({
      status: true,
      message: 'User updated successfully',
      data: user
    });
  }

  static deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const user = await userService.deleteUser(id as string);
    res.status(200).json({
      status: true,
      message: 'User deleted successfully',
      data: user
    });
  }

};

export default userController;