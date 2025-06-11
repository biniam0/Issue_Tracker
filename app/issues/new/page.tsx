"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

import Spinner from "@/app/components/Spinner";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { AiOutlineInfoCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssueSchema from "@/app/validationSchema";
import { z } from "zod/v4";
import ErrorMessage from "@/app/components/ErrorMessage";
import delay from "delay";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormType = z.infer<typeof createIssueSchema>;

const NewIssuePage = async () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const description = watch("description", "");

  const handleCreateIssue = async (data: IssueFormType) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      if (axios.isAxiosError(error)) {
        setError("Something went wrong while creating issue.");
        console.error("Axios error:", error);
      } else {
        setError(String(error));
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  await delay(2000);

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
        <ErrorMessage> {errors.title?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Title: Bug Fix"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage> {errors.description?.message}</ErrorMessage>
        <SimpleMDE
          placeholder="Description"
          value={description}
          onChange={(value) => setValue("description", value)}
        />

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
