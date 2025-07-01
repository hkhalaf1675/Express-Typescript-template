import jwt from "jsonwebtoken";
import appConfig from "../config/app.config";

const jwtSecret = appConfig.jwt.secret;

export const signToken = (payload: object): string => {
    return jwt.sign(payload, jwtSecret, {
        expiresIn: `${appConfig.jwt.expiresIn}Hour`
    });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, jwtSecret);
}