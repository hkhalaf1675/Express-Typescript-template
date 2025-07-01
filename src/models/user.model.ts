import mongoose, { Document, Schema } from "mongoose";
import { hashText, verifyHashed } from "../utils/bcrypt";

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
};

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
}, { timestamps: true });

userSchema.pre<IUser>('save', async function(next) {
    if(!this.password)
        return next();
    this.password = await hashText(this.password);
    next();
});

userSchema.methods.comparePassword = async function(condidatePassword: string): Promise<boolean> {
    return await verifyHashed(condidatePassword, this.password);
};

export default mongoose.model<IUser>('Users', userSchema);