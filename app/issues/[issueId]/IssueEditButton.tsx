import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
      <Button>
        <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
      </Button>
      
  );
};

export default IssueEditButton;
