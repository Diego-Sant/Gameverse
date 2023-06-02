import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {compare} from "bcrypt";

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    
    pages: {
        signIn: '/login',
    },
    // Ativar o debug quando estiver em processo de desenvolvimento
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    // Usar tokens JWT
    session: {
        strategy: 'jwt',
    },
    // Usado para verificar os tokens JWT
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    // Proteger e assinar os cookies da sessão
    secret: process.env.NEXTAUTH_SECRET
})

export default NextAuth(authOptions);