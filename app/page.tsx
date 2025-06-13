import { prisma } from "@/prisma/client";
import IssuesChart from "./IssuesChart";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";

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
      <LatestIssues />
      <IssuesSummary open={open} closed={closed} inProgress={inProgress} />
      <IssuesChart open={open} closed={closed} inProgress={inProgress} />
    </>
  );
};

export default Home;
