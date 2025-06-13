"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface T {
  OPEN: number;
  CLOSED: number;
  IN_PROGRESS: number;
}

interface Props {
  propData: T;
}

const IssuesChart = async ({ propData }: Props) => {
  const data = [
    { label: "Open", value: propData.OPEN },
    { label: "In Progress", value: propData.IN_PROGRESS },
    { label: "Closed", value: propData.CLOSED },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssuesChart;
