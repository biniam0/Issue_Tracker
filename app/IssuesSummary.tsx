import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface T {
  OPEN: number;
  CLOSED: number;
  IN_PROGRESS: number;
}

interface Props {
  propData: T;
}

const IssuesSummary = async ({ propData }: Props) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: propData.OPEN, status: "OPEN" },
    {
      label: "In-Progress Issues",
      value: propData.IN_PROGRESS,
      status: "IN_PROGRESS",
    },
    { label: "Closed Issues", value: propData.CLOSED, status: "CLOSED" },
  ];
  return (
    <Flex gap="3">
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
