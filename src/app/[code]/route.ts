import { NextResponse } from "next/server";
import {eq, sql} from "drizzle-orm";

import { db } from "@/lib/db";
import { shorturls } from "@/lib/db/schema";

type RouteContext = {
    params: Promise<{
        code: string;
    }>;
};

export async function GET(
    _request: Request,
    context: RouteContext
) {
    const {code} = await context.params;

    const result = await db
     .select()
     .from(shorturls)
     .where(eq(shorturls.code, code))
     .limit(1);

    const shortUrl = result[0];

    if (!shortUrl) {
        return new NextResponse("Short URL not found", {
            status: 400,
        });
    }

    await db
     .update(shorturls)
     .set({
        clickCount: sql`${shorturls.clickCount} + 1`,
     })
     .where(eq(shorturls.id, shortUrl.id));
    
    return NextResponse.redirect(shortUrl.originalUrl);
}