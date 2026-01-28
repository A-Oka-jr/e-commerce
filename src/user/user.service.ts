import { User, Role } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import * as bcrypt from 'bcryptjs';
import "dotenv/config";

class userService {
    static getAllUsers = async () => {
        // join vendor table
        return await prisma.user.findMany({
            include: {
                vendor: true,
            },
        });
    }

    static create = async (userDto: CreateUserDto) => {
        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        const passwordHash = await bcrypt.hash(userDto.password, saltRounds);

        // Destructure to prevent injection of sensitive fields
        const { isVendor, vendorId, role, ...rest } = userDto;
        const userData: any = { ...rest, password: passwordHash };

        if (isVendor) {
            const vendor = await prisma.vendor.create({ data: { name: userDto.name || "New Vendor" } });
            userData.vendorId = vendor.id;
            userData.role = Role.VENDOR;
        } else {
            userData.role = Role.ADMIN;
            userData.vendorId = null;
        }

        return await prisma.user.create({ data: userData });
    }

    static getOneUser = async (id: string) => {
        return await prisma.user.findUnique({ where: { id } });
    }

    static updateUser = async (id: string, user: Partial<UpdateUserDto>) => {
        return await prisma.user.update({ where: { id }, data: user });
    }

    static deleteUser = async (id: string) => {
        return await prisma.user.delete({ where: { id } });
    }
};

export default userService;
