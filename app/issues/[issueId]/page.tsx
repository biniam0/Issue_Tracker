import { notFound } from "next/navigation";
import { prisma } from "@/prisma/client";
import ReactMarkdown from "react-markdown"
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

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
      <Card className="prose mt-4"> 
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
