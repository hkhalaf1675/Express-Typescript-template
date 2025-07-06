import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICategory extends Document {
    name: string;
    createdBy: Types.ObjectId;
};

const categorySchema: Schema = new Schema<ICategory>({
    name: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
}, { timestamps: true });

const Category = mongoose.model<ICategory>('Categories', categorySchema);

export default Category;