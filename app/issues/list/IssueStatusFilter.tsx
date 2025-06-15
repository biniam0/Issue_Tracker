"use client";

import { updateQueryParams } from "@/app/utils/updateQuery";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
]

interface IssueStatusFilterContentProps {
  basePath?: string;
}

const IssueStatusFilterContent = ({ 
  basePath = "/issues/list" 
}: IssueStatusFilterContentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (status: string) => {
    const currentParamsObject: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      currentParamsObject[key] = value;
    });
    
    const query = updateQueryParams(
      {
        status: status === "all" ? null : status,
        page: null, 
      },
      currentParamsObject
    );

    router.push(`${basePath}${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "all"}
      onValueChange={handleStatusChange}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Item value="all">All</Select.Item>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

interface IssueStatusFilterProps {
  basePath?: string;
}

const IssueStatusFilter = ({ basePath }: IssueStatusFilterProps) => {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <IssueStatusFilterContent basePath={basePath} />
    </Suspense>
  );
};

export default IssueStatusFilter;