import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import IssueDeleteButton from "./IssueDeleteButton";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import { cache } from "react";

interface Props {
  params: {
    issueId: string;
  };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const { issueId } = await params;

  const issue = await fetchUser(parseInt(issueId));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <IssueEditButton issueId={issue.id} />
            <IssueDeleteButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({ params }: Props) => {
  const { issueId } = await params;
  const issues = await fetchUser(parseInt(issueId));
  return {
    title: "Issue - " + issues?.title,
    description: "Details of issue " + issues?.description,
  };
};

export default IssueDetailPage;
