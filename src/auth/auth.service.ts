import { prisma } from "../lib/prisma";
import { RegisterDto, LoginDto } from "./auth.dto";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { Role } from "../generated/prisma/client";

class AuthService {
    static register = async (dto: RegisterDto) => {
        const existingUser = await prisma.user.findUnique({
            where: { email: dto.email }
        });

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        const passwordHash = await bcrypt.hash(dto.password, saltRounds);

        // Force role to CUSTOMER
        const user = await prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: passwordHash,
                role: Role.CUSTOMER
            }
        });

        // Exclude password from return
        const { password, ...result } = user;
        return result;
    }

    static login = async (dto: LoginDto) => {
        const user = await prisma.user.findUnique({
            where: { email: dto.email }
        });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: '1d' } // Token expires in 1 day
        );

        const { password, ...userData } = user;
        return { token, user: userData };
    }
}

export default AuthService;
