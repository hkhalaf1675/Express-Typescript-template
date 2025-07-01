import { Request, Response } from "express";
import User from '../models/user.model';
import { signToken } from "../utils/jwt";
import { verifyHashed } from "../utils/bcrypt";

export const register = async(req: Request, res: Response) => {
    const { name, email, password, address, phone } = req.body;

    const existsUser = await User.findOne({ email });
    if(existsUser){
        res.status(400).json({
            success: false,
            message: 'Validaton Error',
            errors: ['There is already user exists with the same email']
        });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
        address,
        phone
    });

    const token = signToken({id: user.id, email});
    
    res.status(200).json({
        success: true,
        message: 'User had been registered successfully',
        data: { user: { id: user.id }, token }
    });
    return;
}

export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, 'id name email password');
    if(!user){
        res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: ['There is problem at logging, please check the email and password']
        });
        return;
    }

    const isMatched = await verifyHashed(password, user.password);
    if(!isMatched){
        res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: ['There is problem at logging, please check the email and password']
        });
        return;
    }

    const token = signToken({id: user.id, email});
    
    res.status(200).json({
        success: true,
        message: 'User had been logined successfully',
        data: { user: { id: user.id }, token }
    });
    return;
}