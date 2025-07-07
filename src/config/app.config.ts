import * as dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 7009,
    mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/chat_app",
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    jwt: {
        secret: process.env.JWT_SECRET || 'secret key of jwt',
        expiresIn: parseInt(process.env.JWT_EXPIRESIN || '1')
    }
}