"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { updateQueryParams } from "../utils/updateQuery";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  basePath?: string; 
}

const Pagination = ({
  itemCount: itemsCount,
  pageSize,
  currentPage,
  basePath = "/issues/list", 
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const currentParamsObject: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      currentParamsObject[key] = value;
    });
    
    const query = updateQueryParams(
      {
        page: page.toString(),
      },
      currentParamsObject
    );

    router.push(`${basePath}${query}`);
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;