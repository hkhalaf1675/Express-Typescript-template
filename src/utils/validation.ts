import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Validator } from 'node-input-validator';

type ValidationResponse = {
    matched: boolean;
    errors: string[];
};

type ValidationRule = {
    [key: string]: string;
};

type ValidationDataSource = 'params' | 'query' | 'body';

export const validate = 
    async(
        data: any, 
        rules: ValidationRule
    ): Promise<ValidationResponse> => {
        const v = new Validator(data, rules);
        
        const matched = await v.check();
        if(matched){
            return { matched: true, errors: [] };
        }

        const errors: string[] = [];

        for (let key in v.errors) {
            errors.push(v.errors[key].message);
        }

        return { matched: false, errors };
    }

export const validation = 
    (
        rules: ValidationRule,
        source: ValidationDataSource = 'body'
    ): RequestHandler => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const data = req[source];

            const result = await validate(data, rules);
            if (result.matched) {
                next();
                return;
            }

            res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: result.errors
            });
        }
    };