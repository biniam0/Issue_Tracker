import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ issueId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();
  const { issueId } = await context.params; // Await the params
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 });

  const { title, description, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      assignedToUserId: assignedToUserId ?? null,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ issueId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { issueId } = await context.params; // Await the params

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(issueId) },
  });

  return NextResponse.json(deletedIssue);
}
