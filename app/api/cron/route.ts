import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    // cron runs every 20 minutes from supabase
    console.error("Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.counter.create({
      data: {
        value: 0,
      },
    });

    return NextResponse.json({ message: "Counter created" });
  } catch (error) {
    console.error('Error creating counter:', error);
    return NextResponse.json({ error: "Error creating counter" }, { status: 500 });
  }
}
