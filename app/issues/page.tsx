import { prisma } from "@/prisma/client";
import { Badge, Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import IssueActionPage from "./IssueAction";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);

  return (
    <div>
      <IssueActionPage />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="block md:hidden">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row>
              <Table.RowHeaderCell>
                <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                <div className="hidden md:block">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.description}
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

export default IssuesPage;
