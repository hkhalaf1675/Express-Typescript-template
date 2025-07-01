import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const globalErrorHandler: ErrorRequestHandler = async(
    err: any, req: Request, res: Response, next: NextFunction
) => {
    if(err){
        console.log(err);

        res.status(500).json({
            success: false,
            message: 'Server Error',
            errors: ['Something went wrong!']
        });

        return;
    }

    next(err);
}

export default globalErrorHandler;