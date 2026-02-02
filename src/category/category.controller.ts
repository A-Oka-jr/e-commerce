import { Request, Response } from "express";
import categoryService from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

class CategoryController {
    static create = async (req: Request, res: Response) => {
        try {
            const category = await categoryService.create(req.body as CreateCategoryDto);
            res.status(201).json({
                status: true,
                message: 'Category created successfully',
                data: category
            });
        } catch (e) {
            res.status(500).json({ message: "Error creating category" });
        }
    }

    static getAll = async (req: Request, res: Response) => {
        try {
            const categories = await categoryService.getAll();
            res.status(200).json({
                status: true,
                message: 'Categories fetched successfully',
                data: categories
            });
        } catch (e) {
            res.status(500).json({ message: "Error fetching categories" });
        }
    }

    static getOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid id' });
        }
        try {
            const category = await categoryService.getOne(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({
                status: true,
                message: 'Category fetched successfully',
                data: category
            });
        } catch (e) {
            res.status(500).json({ message: "Error fetching category" });
        }
    }

    static update = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid id' });
        }
        try {
            const category = await categoryService.update(id, req.body as UpdateCategoryDto);
            res.status(200).json({
                status: true,
                message: 'Category updated successfully',
                data: category
            });
        } catch (e) {
            res.status(500).json({ message: "Error updating category" });
        }
    }

    static delete = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid id' });
        }
        try {
            await categoryService.delete(id);
            res.status(200).json({
                status: true,
                message: 'Category deleted successfully',
                data: null
            });
        } catch (e) {
            res.status(500).json({ message: "Error deleting category" });
        }
    }
}

export default CategoryController;
