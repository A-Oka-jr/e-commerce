import { Role } from "../generated/prisma/client";

export class RegisterDto {
    email: string;
    name?: string;
    password: string;
    role: Role = Role.CUSTOMER; // Force role to CUSTOMER for registration
}

export class LoginDto {
    email: string;
    password: string;
}
