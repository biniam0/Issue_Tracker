import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany({orderBy: {name: "asc" }});
  console.log("Users: ====> ", users);
  if (!users) return NextResponse.json("Users not found", { status: 404 });

  return NextResponse.json(users, { status: 200 });
};

export { GET };
