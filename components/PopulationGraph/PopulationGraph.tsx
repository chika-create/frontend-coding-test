import { FC, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchPopulationData } from "../../lib/fetchPopulationData";

interface PopulationGraphProps {
  apikey: string;
  selectedPrefs: string[];
}

interface PopulationData {
  year: number;
  value: number;
}

export const PopulationGraph: FC<PopulationGraphProps> = ({
  apikey,
  selectedPrefs,
}) => {
  const [populationData, setPopulationData] = useState<{
    [key: string]: PopulationData[];
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const newPopulationData: { [key: string]: PopulationData[] } = {};
      for (const prefCode of selectedPrefs) {
        const data = await fetchPopulationData(apikey, Number(prefCode));
        if (data.length === 0) {
          setError("Failed to fetch population data");
        }
        newPopulationData[prefCode] = data;
      }

      setPopulationData(newPopulationData);
      setLoading(false);
    };
    fetchData();
  }, [selectedPrefs, apikey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const generateGraphData = () => {
    const graphData: { [key: string]: any } = {};

    for (const [prefCode, data] of Object.entries(populationData)) {
      data.forEach((yearData) => {
        if (!graphData[yearData.year]) {
          graphData[yearData.year] = { year: yearData.year };
        }
        graphData[yearData.year][prefCode] = yearData.value;
      });
    }

    return Object.values(graphData);
  };

  const graphData = generateGraphData();

  return (
    <>
      <div>
        <h2>選択された都道府県:</h2>
        <ul>
          {selectedPrefs.map((prefCode) => {
            return <li key={prefCode}>{prefCode}</li>;
          })}
        </ul>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(populationData).map((prefCode, index) => (
            <Line
              key={prefCode}
              type="monotone"
              dataKey={prefCode}
              stroke={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
