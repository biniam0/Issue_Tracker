"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueType {
  title: string;
  description: string;
}

export default function FormClient() {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm<IssueType>();

  const description = watch("description");

  const onSubmit = async (data: IssueType) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <form className="space-y-4 max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder="Title" {...register("title")} />
      <SimpleMDE
        value={description}
        onChange={(val) => setValue("description", val)}
        placeholder="Description"
      />
      <Button type="submit">Submit Issue</Button>
    </form>
  );
}
