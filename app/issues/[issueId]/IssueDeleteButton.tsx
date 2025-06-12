import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
};

export default IssueDeleteButton;
