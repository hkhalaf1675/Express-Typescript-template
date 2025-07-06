import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
    content: string;
    isSeen: boolean;
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    catgoryId?: Types.ObjectId;
};

const messageSchema: Schema = new Schema<IMessage>({
    content: { type: String, required: true },
    isSeen: { type: Boolean, required: true, default: false },
    senderId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    catgoryId: { type: Schema.Types.ObjectId, ref: 'Categories', required: false }
}, { timestamps: true });

const Message = mongoose.model<IMessage>('Messages', messageSchema);
export default Message;