import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import User from "../models/user.model";
export const userAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;
        
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        
        if(!token) {
            res.status(401).json({
                success: false,
                message: 'Token required',
                errors: ['You are not logged in! Please log in to get access.']
            });
            return;
        }

        const decoded = verifyToken(token);

        const currentUser = await User.findById(decoded.id);
        if(!currentUser) {
            res.status(401).json({
                success: false,
                message: 'Token required',
                errors: ['The user belonging to this token no longger exists']
            });
            return;
        }

        req['user'] = currentUser;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token required',
            errors: ['Token expired']
        });
        return;
    }
}