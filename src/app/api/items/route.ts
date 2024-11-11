import { NextRequest,NextResponse } from "next/server";
import connectDB  from "../../../lib/db";
import Item from "@/models/item";
export async function POST(req: NextRequest,res: NextResponse){
    await connectDB();
    try {
        const {name, description, price,quantity} = await req.json();
    const newItem = new Item({name,description,price,quantity});
    await newItem.save();
    return NextResponse.json(newItem,{status:201});
    }catch(error:any){
        return NextResponse.json({error: error.message},{status:500});
    }
    
}

export  async function GET(req:NextRequest,res:NextResponse){
    await connectDB();
    const items = await Item.find();
    return NextResponse.json(items,{status:200});
}

export async function DELETE(req:NextRequest,res:NextResponse){
    await connectDB();
    const {id} = await req.json();
    try {
        await Item.findByIdAndDelete(id);
        return NextResponse.json({message: "Item deleted"},{status:200});
    }catch(error:any){
        return NextResponse.json({error: error.message},{status:500});
    }
}
export async function PUT(req:NextRequest,res:NextResponse){
    await connectDB();
    const {id,name,description,price,quantity} = await req.json();
    try {
        const item = await Item.findOneAndUpdate({_id: id},{name,description,price,quantity},{new: true});
        return NextResponse.json(item,{status:200});
    }
    catch(error:any){
        return NextResponse.json({error: error.message},{status:500});
    }
}
