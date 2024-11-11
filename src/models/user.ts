import mongoose, { Model,Schema,Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string;
    __v: number;
    _id: string;
}

export const UserSchema: Schema<IUser> = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, required: false},

});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User",UserSchema);
export default User;