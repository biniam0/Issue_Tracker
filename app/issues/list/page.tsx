import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";
import IssueActionPage from "./IssueAction";
import { Issue, Status } from "@prisma/client";
import { AiOutlineArrowUp } from "react-icons/ai";

interface Props {
  searchParams: {
    status: Status | "all";
    orderBy: keyof Issue;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = [...Object.values(Status), "all"];
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  let { status } = await searchParams;

  status = statuses.includes(status) ? status : "all";

  let issues = await prisma.issue.findMany();

  if (status !== "all") {
    issues = await prisma.issue.findMany({
      where: {
        status: status,
      },
    });
  }

  return (
    <div>
      <IssueActionPage />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <AiOutlineArrowUp className="pl-1 inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

// export const dynamic = 'force-dynamic'

export default IssuesPage;
