import { Request, Response } from "express";
import productService from "./product.service";
import ProductDto from "./product.dto";

class productController {
    static create = async (req: Request, res: Response) => {
        // only vendors can create products
        const product = await productService.create(req.body as ProductDto);
        res.status(201).json({
            status: true,
            message: 'Product created successfully',
            data: product
        });
    }
    static getAllProducts = async (req: Request, res: Response) => {
        const products = await productService.getAllProducts();
        res.status(200).json({
            status: true,
            message: 'Products fetched successfully',
            data: products
        });
    }
    static getOneProduct = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') {
            return res.status(400).json({
                status: false,
                message: 'Invalid id'
            });
        }
        const product = await productService.getOneProduct(id as string);
        res.status(200).json({
            status: true,
            message: 'Product fetched successfully',
            data: product
        });
    }
    static updateProduct = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') {
            return res.status(400).json({
                status: false,
                message: 'Invalid id'
            });
        }
        const product = await productService.updateProduct(id as string, req.body as ProductDto);
        res.status(200).json({
            status: true,
            message: 'Product updated successfully',
            data: product
        });
    }
    static deleteProduct = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') {
            return res.status(400).json({
                status: false,
                message: 'Invalid id'
            });
        }
        const product = await productService.deleteProduct(id as string);
        res.status(200).json({
            status: true,
            message: 'Product deleted successfully',
            data: product
        });
    }
};

export default productController;
