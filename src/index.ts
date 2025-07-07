import * as express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as cors from 'cors';
import { CorsOptions } from 'cors';
import appConfig from './config/app.config';
import globalErrorHandler from './middlewares/global-error-handler.middleware';
// routes import 
import authRoutes from './routes/auth/auth.routes';
import categoryRoutes from './routes/categories/categories.routes';

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
// Auth Routes
app.use('/api/auth', authRoutes);

// Categories Routes
app.use('/api/categories', categoryRoutes);

// Main Route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Chatting app is running ...'
    });
});

// // Handle Not found Routes
// app.all('*', (req: Request, res: Response) => {
//     res.status(404).json({
//         success: false,
//         message: 'Route Not Found',
//         errors: [`Can not find ${req.originalUrl}`]
//     });
// });

// Global Error Handler
app.use(globalErrorHandler);

app.listen(appConfig.port, () => {
    console.log(`Server is running at port: ${appConfig.port}`);
});