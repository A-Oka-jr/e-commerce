import { Request, Response } from "express";
import AuthService from "./auth.service";

class AuthController {
    static register = async (req: Request, res: Response) => {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            if (error.message === "User with this email already exists") {
                res.status(409).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error", error: error.message });
            }
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json(result);
        } catch (error: any) {
            if (error.message === "Invalid email or password") {
                res.status(401).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error", error: error.message });
            }
        }
    }
}

export default AuthController;
