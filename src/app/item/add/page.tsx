"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
const Page = () => {
    const {data:session} = useSession();
    const router = useRouter();
    
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description, price, quantity }),
            });
            if (!res.ok) {
                throw new Error("Failed to create item");
                
            }
            const data = await res.json();
          
            router.push("/")
        } catch (error: any) {
            
            setError(error.message);
        }
    }

    return ( 
        <main className="flex items-center justify-center min-h-screen">
            <div className="rounded-xl shadow-xl bg-gray-50 w-[450px]">
                <h1 className="text-2xl font-bold text-center ">Create an Item</h1>
                
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="m-4">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" required onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter name of the item" />
                    </div>
                    <div className="m-4">
                        <Label htmlFor="name">Description</Label>
                        <Textarea id="description" required onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Enter description of the item" />
                    </div>
                    <div className="m-4">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" onChange={(e) => setPrice(Number(e.target.value))} value={price} required min={0} placeholder="Enter price of the item" />
                    </div>
                    <div className="m-4">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" type="number" required min={0}  onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Enter quantity of the item" />
                    </div>
                    <Button variant="secondary" className="m-5" type="submit">Create Item </Button>
                </form>
            </div>
        </main>
     );
}
 
export default Page;