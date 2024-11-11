"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect,useSearchParams } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-center text-2xl">Sign In !</h1>
        <Button
          variant="destructive"
          className="mt-5"
          onClick={() => signIn("github", { callbackUrl })}
          role="button"
        >
          Continue with Github
        </Button>
      </div>
    </main>
  );
};

export default Page;
