import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    issueId: string;
  };
}

const IssueDetailPage = async ({ params: { issueId } }: Props) => {
  if (typeof issueId !== "number") notFound();
  
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(issueId),
    },
  });
  return (
    <div>
      <ul>
        {issue &&
          Object.entries(issue).map(([key, value]) => (
            <li key={key}>
              {typeof value === "object" && value instanceof Date
                ? value.toISOString()
                : value.toString()}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default IssueDetailPage;
