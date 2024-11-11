import mongoose, { Schema,Document, Model } from "mongoose";

export interface IItem extends Document {
    name: string;
    description: string;
    price: number;
    quantity: number;
    __v: number;
    _id: string;
}

export const ItemSchema: Schema<IItem> = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
});


const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item",ItemSchema);
export default Item;