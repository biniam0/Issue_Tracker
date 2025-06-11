import { z } from "zod/v4";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required"),
});

export default createIssueSchema;
