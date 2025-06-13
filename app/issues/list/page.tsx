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

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const { status: statusParam, orderBy: orderByParam } = await searchParams;

  const statuses = [...Object.values(Status), "all"];
  const status = statuses.includes(statusParam) ? statusParam : "all";
  const validatedOrderBy = columns
    .map((column) => column.value)
    .includes(orderByParam)
    ? { [orderByParam]: "asc" }
    : undefined;

  let issues = [];

  if (status !== "all") {
    issues = await prisma.issue.findMany({
      where: { status },
      orderBy: validatedOrderBy,
    });
  } else {
    issues = await prisma.issue.findMany({
      orderBy: validatedOrderBy,
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
                {/* IT IS SURE THAT WE ARE UPDATING THE QUERY 
                  PARAMS ON THE CURRENT ROUTE NOT NEED TO SPECIFY PATHNAME */}
                <NextLink
                  href={{
                    query: { status: statusParam, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>

                {column.value === orderByParam && (
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
