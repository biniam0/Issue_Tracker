import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssuesSummary = async ({ open, closed, inProgress }: Props) => {

  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="3" p="4">
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction="column">
            <Link
              href={`/issues/list?status=${status.status}`}
              className="text-sm font-extralight"
            >
              {status.label}
            </Link>
            <Text size="4" className="font-bold">
              {status.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
