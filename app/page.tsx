import { prisma } from "@/prisma/client";
import IssuesChart from "./IssuesChart";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import { Flex, Grid, Heading } from "@radix-ui/themes";

const counts = {
  OPEN: 0,
  IN_PROGRESS: 0,
  CLOSED: 0,
};

const Home = async () => {
  const groupedCounts = await prisma.issue.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  groupedCounts.forEach(({ status, _count }) => {
    counts[status] = _count.status;
  });

  const { OPEN: open, CLOSED: closed, IN_PROGRESS: inProgress } = counts;
  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Heading className="font-normal">Dashboard</Heading>
        <Flex direction="column" gap="5">
          <IssuesSummary propData={counts} />
          <IssuesChart propData={counts} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
};

export default Home;
