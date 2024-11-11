"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
const Page = ( )=> {
  const router = useRouter();
  const {data:session} = useSession();
  if(!session){
    router.push("/login");
    return;
  }
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const name = searchParams.get("name") ?? "";
  const description = searchParams.get("description") ?? "";
  const price = searchParams.get("price") ?? "";
  const quantity = searchParams.get("quantity") ?? "";
  const [newName, setNewName] = useState<string>(name);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newPrice, setNewPrice] = useState<number>(parseFloat(price));
  const [newQuantity, setNewQuantity] = useState<number>(parseInt(quantity));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name: newName, description: newDescription, price: newPrice, quantity: newQuantity }),
      });
      if (!res.ok) {
        throw new Error("Failed to update item");
      }
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
    }
  }
  
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="rounded-xl shadow-xl bg-gray-50 w-[450px]">
        <h1 className="text-2xl font-bold text-center">Edit Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="m-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value = {newName}
              type="text"
              onChange={(e) => setNewName(e.target.value)}
              required
              placeholder="Enter name of the item"
            />
          </div>
          <div className="m-4">
            <Label htmlFor="name">Description</Label>
            <Textarea
              value = {description}
              id="description"
              onChange={(e) => setNewDescription(e.target.value)}
              required
              placeholder="Enter description of the item"
            />
          </div>
          <div className="m-4">
            <Label htmlFor="price">Price</Label>
            <Input
              value = {price}
              id="price"
              onChange={(e) => setNewPrice(parseFloat(e.target.value))}
              type="number"
              required
              min={0}
              placeholder="Enter price of the item"
            />
          </div>
          <div className="m-4">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              value = {quantity}
              onChange={(e) => setNewQuantity(parseInt(e.target.value))}
              id="quantity"
              type="number"
              required
              min={0}
              placeholder="Enter quantity of the item"
            />
          </div>
          <div className="m-4">
            <Button variant="secondary" type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
