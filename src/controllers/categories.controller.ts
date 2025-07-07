import { Request, Response } from "express";
import Category from "../models/category.model";
import Message from "../models/message.model";

export const createCategory = async(req: Request, res: Response) => {
    const { name, messagesIds } = req.body;
    const createdBy = req['user']._id;

    const category = await Category.create({
        name,
        createdBy
    });

    if(messagesIds) {
        for (const id of messagesIds) {
            const message = await Message.findById(id);
            if(!message) {
                res.status(404).json({
                    success: false,
                    message: 'Validation Error',
                    errors: ['Please insert array of exists messages ids']
                });
                return;
            }
        }

        await Message.find({_id: messagesIds}).updateMany({catgoryId: category._id});
    }

    res.status(201).json({
        success: true,
        message: 'Category has been added successfully',
        data: { category }
    });
}

export const updateCategory = async(req: Request, res: Response) => {
    const { name } = req.body;
    const _id = req.params._id;

    const category = await Category.findById(_id);
    if(!category) {
        res.status(404).json({
            success: false,
            message: 'Validation Error',
            errors: ['Thers is no categories with this _id']
        });
        return;
    }

    category.name = name;
    await category.save();

    res.status(200).json({
        success: true,
        message: 'Category has been updated successfully',
        data: null
    });
    return;
}

export const deleteCategory = async(req: Request, res: Response) => {
    const _id = req.params._id;

    const category = await Category.findById(_id);
    if(!category) {
        res.status(404).json({
            success: false,
            message: 'Validation Error',
            errors: ['Thers is no categories with this _id']
        });
        return;
    }

    await Category.deleteOne({ _id });

    res.status(200).json({
        success: true,
        message: 'Category has been deleted successfully',
        data: null
    });
    return;
}

export const findOneCategory = async(req: Request, res: Response) => {
    const _id = req.params._id;

    const category = await Category.findById(_id);
    if(!category) {
        res.status(404).json({
            success: false,
            message: 'Validation Error',
            errors: ['Thers is no categories with this _id']
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: '',
        data: { category }
    });
    return;
}

export const findUserCategories = async(req: Request, res: Response) => {
    const createdBy = req['user']._id;
    const name = req.query.name;

    let filter = {};
    filter['createdBy'] = createdBy;
    if(name) {
        filter['name'] = { $regex: name, $options: 'i' }
    }

    const categories = await Category.find(filter);

    res.status(200).json({
        success: true,
        message: '',
        data: { count: categories.length, categories }
    });
    return;
}