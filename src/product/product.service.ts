import { prisma } from "../lib/prisma";
import ProductDto from "./product.dto";

class productService {
    static create = async (productDto: ProductDto) => {
        return await prisma.product.create({ data: productDto as any });
    }
    static getAllProducts = async () => {
        return await prisma.product.findMany({
            include: {
                vendor: true,
                category: true,
            },
        });
    }
    static getOneProduct = async (id: string) => {
        return await prisma.product.findUnique({ where: { id } });
    }
    static updateProduct = async (id: string, productDto: ProductDto) => {
        return await prisma.product.update({ where: { id }, data: productDto });
    }
    static deleteProduct = async (id: string) => {
        return await prisma.product.delete({ where: { id } });
    }
};

export default productService;