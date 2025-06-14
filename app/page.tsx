import { prisma } from "@/prisma/client";
import DashboardClient from "./DashboardClient";

export const revalidate = 60;

export default async function Home() {
  const groupedCounts = await prisma.issue.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const counts = {
    OPEN: 0,
    IN_PROGRESS: 0,
    CLOSED: 0,
  };

  groupedCounts.forEach(({ status, _count }) => {
    counts[status] = _count.status;
  });

  return <DashboardClient counts={counts} />;
}
