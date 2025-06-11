import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root placeholder="Title: Bug Fix"></TextField.Root>
      <TextArea placeholder="Issue description"></TextArea>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
