// app/DashboardClient.tsx
'use client';

import dynamic from 'next/dynamic';
import { Flex, Grid, Text } from '@radix-ui/themes';

const IssuesSummary = dynamic(() => import('./IssuesSummary'));
const IssuesChart = dynamic(() => import('./IssuesChart'));
const LatestIssues = dynamic(() => import('./LatestIssues'));

interface Props {
  counts: {
    OPEN: number;
    IN_PROGRESS: number;
    CLOSED: number;
  };
}

export default function DashboardClient({ counts }: Props) {
  return (
    <>
      <Text className="text-2xl font-medium pb-3">Dashboard</Text>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssuesSummary propData={counts} />
          <IssuesChart propData={counts} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}
