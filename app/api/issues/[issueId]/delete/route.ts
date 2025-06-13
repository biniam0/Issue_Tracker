import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

export { DELETE };
