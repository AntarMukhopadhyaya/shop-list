import NextAuth,{NextAuthOptions} from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from "@/models/user";   
import connectDB from "@/lib/db";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export  const authOptions: NextAuthOptions = {
    providers : [
    Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        
    
        

    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
       
        async signIn({user,account,profile,email}){
            
            if (account && account.provider === 'github'  ) {
                try {
                  // Check if the user already exists in the database
                  const existingUser = await User.findOne({ email: profile?.email});
        
                  if (!existingUser) {
                    // Save the new GitHub user
                    const newUser = new User({
                      
                      username: profile?.name,
                      email: profile?.email,
                      image: profile?.image,
                    });
        
                    await newUser.save();
                  }
                } catch (error) {
                  console.error("Error saving GitHub user: ", error);
                }
              }
              return true;
        }
    }
   
}
const handler = NextAuth(authOptions);
export {handler as GET , handler as POST};