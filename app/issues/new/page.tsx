"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueType {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm<IssueType>();
  const description = watch("description", "");

  const handleCreateIssue = (data: IssueType) => {
    axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form
      className="max-w-lg space-y-3"
      onSubmit={handleSubmit((data) => handleCreateIssue(data))}
    >
      <TextField.Root
        placeholder="Title: Bug Fix"
        {...register("title")}
      ></TextField.Root>
      <SimpleMDE
        placeholder="Description"
        value={description}
        onChange={(value) => setValue("description", value)}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
