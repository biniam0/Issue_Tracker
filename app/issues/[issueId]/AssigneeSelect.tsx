"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const users = await axios
          .get<User[]>("/api/users")
          .then((res) => res.data);
        setUsers(users);
      } catch (error) {
        console.log("Error while fetching for user", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // const fetchUser = async () => {
  //   try {
  //     return axios.get("/api/users").then((res) => res.data);
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // };

  // const {
  //   data: users,
  //   error,
  //   isLoading,
  // } = useQuery<User[]>({
  //   queryKey: ["users"],
  //   queryFn: fetchUser,
  //   staleTime: 60 * 1000,
  //   retry: 3,
  // });

  if (isLoading) return <Skeleton height="2rem" />;

  // if (error) return null;
  return (
    <>
      <Select.Root
        size="2"
        onValueChange={async (userId) => {
          await axios
            .patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            })
            .catch(() => toast.error("Changes could not be saved."));
        }}
        defaultValue={issue.assignedToUserId || ""}
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

export default AssigneeSelect;
