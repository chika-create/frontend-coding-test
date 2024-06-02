import React, { FC, useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchPopulationData } from "../../lib/fetchPopulationData"

interface PopulationGraphProps {
  apikey: string;
  selectedPrefs: string[];
}

interface PopulationData {
  year: number;
  value: number;
}

export const PopulationGraph: FC<PopulationGraphProps>  = ({apikey, selectedPrefs}) => {
  const [populationData, setPopulationData] = useState<{ [key: string]: PopulationData[] }>({});
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
          setError('Failed to fetch population data');
        }
        newPopulationData[prefCode] = data;
      }
      
      setPopulationData(newPopulationData);
      setLoading(false);
    };
    fetchData();
  }, [selectedPrefs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const mergedData = selectedPrefs.flatMap(prefCode => 
    populationData[prefCode]?.map(d => ({
      year: d.year,
      [prefCode]: d.value
    })) ?? []
  );

  const keys = selectedPrefs.map(prefCode => ({
    dataKey: prefCode,
    name: `Pref ${prefCode}`
  }));

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
          data={mergedData}
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
          {keys.map(({ dataKey, name }) => (
            <Line key={dataKey} type="monotone" dataKey={dataKey} name={name} stroke="#8884d8" activeDot={{ r: 8 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
