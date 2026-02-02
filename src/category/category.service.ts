import { prisma } from "../lib/prisma";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";


class CategoryService {
    async create(data: CreateCategoryDto) {
        return prisma.category.create({
            data,
        });
    }

    async getAll() {
        return prisma.category.findMany({
            include: {
                products: true,
            },
        });
    }

    async getOne(id: string) {
        return prisma.category.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });
    }

    async update(id: string, data: UpdateCategoryDto) {
        return prisma.category.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return prisma.category.delete({
            where: { id },
        });
    }
}

export default new CategoryService();
