"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;

}

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
export default function Home() {
  
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const getItems = async () => {
      try {
        const resp = await fetch("/api/items");
        if (!resp.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await resp.json();
        setItems(data);
        setFilteredItems(data);
      } catch (err: any) {
        setError((err as Error).message);
      }
    };
    getItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
    console.log(filtered);
  }, [searchQuery, items]);

  const deleteItem = async (id: string) => {
    try {
      const resp = await fetch("/api/items", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!resp.ok) {
        throw new Error("Failed to delete item");
      }
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err: any) {
      setError((err as Error).message);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-center">My Shopping List</h1>
        </div>
        
        <div className="mb-5 flex gap-4 justify-between">
          <Input placeholder="Search Items" required value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          {session && (
          <div className="mb-5">
            <Link href="/item/add"><Button variant="secondary">Add</Button></Link>
          </div>
        )}

        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Table>
          <TableCaption>List of Items for Shopping List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              {session && (
                  <TableHead>Actions</TableHead>
              )}
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item: Item) => (
              <TableRow key={item._id}>
                
                <TableCell className="font-bold">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {session && (
                    <div className="flex gap-2">
                    <Link href={`/item/edit/?id=${item._id}&name=${item.name}&description=${item.description}&price=${item.price}&quantity=${item.quantity}`}  className="p-2 bg-gray-300 rounded-md">Edit</Link>
                    <Button
                      variant="destructive"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                  )}
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
