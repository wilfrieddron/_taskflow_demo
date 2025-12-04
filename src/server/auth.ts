import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { db } from "./db";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Github({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials) {
                console.log("cred:",credentials);
                if (!credentials?.email || !credentials.password) {
                    console.log("missing credentials");
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user?.passwordHash){
                    console.log("no hash received");
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash,
                );

                if (!isValid){
                    console.log("hash is invalid");
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            }
        }),
    ],
    callbacks: {
        session: async ({ session, token}) => {
            if (session.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
    }
};

export const getServerAuthSession = () => {
    return getServerSession(authOptions);
};