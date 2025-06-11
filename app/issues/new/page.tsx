import { Button, TextField } from "@radix-ui/themes";
import MarkDownEditor from "./MarkDownEditor";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root placeholder="Title: Bug Fix"></TextField.Root>
      <MarkDownEditor />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
