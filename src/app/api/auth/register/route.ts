import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { db } from "~/server/db";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1).optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json() as {email:string};
        const {email, password, name} = registerSchema.parse(body);

        const existing = await db.user.findUnique({
            where: { email: email },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Email already used" },
                { status: 400},
            )
        }

        const pwdhash = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                email: email,
                name: name,
                passwordHash: pwdhash,
            }
        });

        return NextResponse.json({ success: true });
    } catch(error) {
        console.error("Registering error:", error);
        return NextResponse.json(
            { error: "Error while creating an account" },
            { status: 500 },
        );
    }
}