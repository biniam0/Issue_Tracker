"use client";

import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import axios from "axios";
import { useState, useEffect } from "react";

const AssigneeSelect = () => {
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
    <Box width="100px" asChild>
      <Select.Root size="2">
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default AssigneeSelect;
