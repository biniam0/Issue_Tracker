import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    issueId: string;
  };
}

const IssueDetailPage = async ({ params }: Props) => {
  const { issueId } = await params;
  //   if (typeof issueId !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(issueId),
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
