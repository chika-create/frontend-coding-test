import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

type PopulationGraphProps = {
  populationData: Record<string, { year: number; value: number }[]>;
};

export const PopulationGraph: FC<PopulationGraphProps> = ({ populationData }) => {
  const dataKeys = Object.keys(populationData);

  // Prepare data for the graph
  const allYears = Array.from(
    new Set(dataKeys.flatMap((key) => populationData[key].map((entry) => entry.year)))
  ).sort((a, b) => a - b);

  const graphData = allYears.map((year) => {
    const dataPoint: { year: number; [key: string]: number } = { year };
    dataKeys.forEach((key) => {
      const entry = populationData[key].find((e) => e.year === year);
      dataPoint[key] = entry ? entry.value : 0;
    });
    return dataPoint;
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={"#"+Math.floor(Math.random()*16777215).toString(16)}
            name={key}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
