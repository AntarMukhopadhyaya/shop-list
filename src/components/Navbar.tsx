"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { Button } from "./ui/button";


const Navbar:React.FC = () => {
    const {data:session} = useSession();

    return  (
        <nav className="bg-gray-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-lg font-semibold">
                    Shop List
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/" >Home</Link>
                    <Link href="/about">About</Link>
                    {session ? (
                        <>
                            <p className="text-gray-600">Hello, {session.user?.name}</p>
                            <Button onClick={() => signOut()} variant="destructive">Sign Out</Button>
                        </>
                    ): (
                        <Link href="/login">Sign In</Link>
                    )}
                </div>
            </div>
            
        </nav>
    )
}
export default Navbar;