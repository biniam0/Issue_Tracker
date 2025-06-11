"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

import { Text, Button, Callout, TextField } from "@radix-ui/themes";
import { AiOutlineInfoCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssueSchema from "@/app/validationSchema";
import { z } from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormType = z.infer<typeof createIssueSchema>;

// interface IssueFormType {
//   title: string;
//   description: string;
// }

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const description = watch("description", "");

  const handleCreateIssue = async (data: IssueFormType) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Something went wrong while creating issue.");
        console.error("Axios error:", error);
      } else {
        setError(String(error));
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="max-w-lg ">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => handleCreateIssue(data))}
      >
        <TextField.Root
          placeholder="Title: Bug Fix"
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {" "}
            {errors.title.message}
          </Text>
        )}
        <SimpleMDE
          placeholder="Description"
          value={description}
          onChange={(value) => setValue("description", value)}
        />
        {errors.description && (
          <Text color="red" as="p">
            {" "}
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
