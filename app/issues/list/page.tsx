import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActionPage from "./IssueAction";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const {
    status: statusParam,
    orderBy: orderByParam,
    page: pageNumber,
  } = await searchParams;

  const statuses = [...Object.values(Status), "all"];
  const status = statuses.includes(statusParam) ? statusParam : "all";
  const validatedOrderBy = columnNames.includes(orderByParam)
    ? { [orderByParam]: "asc" }
    : undefined;

  const page = parseInt(pageNumber) || 1;
  const pageSize = 10;

  let issues = [];

  if (status !== "all") {
    issues = await prisma.issue.findMany({
      where: { status },
      orderBy: validatedOrderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  } else {
    issues = await prisma.issue.findMany({
      orderBy: validatedOrderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  const issueCount = await prisma.issue.count({
    where: status !== "all" ? { status } : undefined,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActionPage />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
