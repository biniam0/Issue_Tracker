import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany({orderBy: {name: "asc" }});
  
  return NextResponse.json(users, { status: 200 });
};

export { GET };
