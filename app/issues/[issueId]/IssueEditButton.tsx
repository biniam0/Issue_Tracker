import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/edit/${issueId}`} className="w-fit">
      <Button className="w-fit">Edit Issue</Button>
    </Link>
  );
};

export default IssueEditButton;
