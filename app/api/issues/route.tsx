import { NextRequest, NextResponse } from "next/server";
import {issueSchema} from "../../validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const GET = async (req: NextRequest) => {
  const issues = await prisma.issue.findMany();
  if (!issues) return NextResponse.json("Users not found", { status: 404 });

  return NextResponse.json(issues, { status: 200 });
};

const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await req.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
};

export { POST, GET };
