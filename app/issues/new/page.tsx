"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { AiOutlineInfoCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [error, setError] = useState("");
  const description = watch("description", "");

  const handleCreateIssue = async (data: IssueType) => {
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
        <SimpleMDE
          placeholder="Description"
          value={description}
          onChange={(value) => setValue("description", value)}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
