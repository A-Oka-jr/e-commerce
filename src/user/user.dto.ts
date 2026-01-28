import { Role } from "../generated/prisma/client";
export class CreateUserDto {
    email: string;
    name?: string;
    password: string;
    vendorId?: string;
    role?: Role;
    isVendor?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export class UpdateUserDto extends CreateUserDto {
}
