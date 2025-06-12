import issueSchema from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const PATCH = async (
  req: NextRequest,
  { params }: { params: { issueId: string } }
) => {
  const body = await req.json();
  const { issueId } = await params;
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  console.log("This is Body: ", body);
  console.log("This is retrieved Issue: ", issue);

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
};

const DELETE = async (
  req: NextRequest,
  { params }: { params: { issueId: string } }
) => {
  const { issueId } = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(issueId),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const deletedIssue = await prisma.issue.delete({
    where: {
      id: parseInt(issueId),
    },
  });
  return NextResponse.json(deletedIssue);
};


export { PATCH, DELETE };
