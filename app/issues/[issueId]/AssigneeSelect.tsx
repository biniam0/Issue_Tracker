"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const handleSelectUser = async (userId: string) => {
    await axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      })
      .catch(() => toast.error("Changes could not be saved."));
  };

  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;

  // if (error) return null;
  return (
    <>
      <Select.Root
        size="2"
        onValueChange={handleSelectUser}
        defaultValue={issue.assignedToUserId || "unassigned"}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const fetchUser = async () => {
  try {
    return axios.get("/api/users").then((res) => res.data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUser,
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
