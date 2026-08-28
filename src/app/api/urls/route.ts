import { NextResponse } from "next/server";
import { eq, exists } from "drizzle-orm";
import {z} from "zod";

import { db } from "@/lib/db";
import { shorturls } from "@/lib/db/schema";
import { error } from "console";

const createUrlSchema = z.object({
    url: z.url(),
});

function generateCode(lenght = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    
    for (let i = 0; i < lenght; i++)
    {
        code += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return code;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const result = createUrlSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid URL" },
      { status: 400 }
    );
  }

  try {
    const { url } = result.data;

    let code = generateCode();

    while (true) {
      const existing = await db
        .select()
        .from(shorturls)
        .where(eq(shorturls.code, code))
        .limit(1);

      if (existing.length === 0) {
        break;
      }

      code = generateCode();
    }

    await db.insert(shorturls).values({
      code,
      originalUrl: url,
    });

    return NextResponse.json(
      {
        code,
        shortUrl: `$(request.nextUrl.origin)/${code}`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}