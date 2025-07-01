import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors, { CorsOptions } from 'cors';
import appConfig from './config/app.config';
import authRoutes from './routes/auth/auth.routes';
import globalErrorHandler from './middlewares/global-error-handler.middleware';

const app = express();

const corsOptions: CorsOptions = {
    origin: appConfig.allowedOrigins?.split(','),
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// connect to mongodb server
mongoose.connect(appConfig.mongodbUri)
    .then(() => console.log("Mongodb connected successfully ..."))
    .catch((err) => console.log("Mongodb connection error: ", err));


// Routes
// Auth Route
app.use('/api/auth', authRoutes);

// Main Route
app.use('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Chatting app is running ...'
    });
});

// Global Error Handler
app.use(globalErrorHandler);

app.listen(appConfig.port, () => {
    console.log(`Server is running at port: ${appConfig.port}`);
});