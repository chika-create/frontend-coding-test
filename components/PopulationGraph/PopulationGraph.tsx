import { FC, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchPopulationData } from "../../lib/fetchPopulationData";
import { fetchPrefectureNames } from "../../lib/fetchPrefectureNames";
import CustomXAxis from "../../lib/customXAxis";
import CustomYAxis from "../../lib/customYAxis";

interface PopulationGraphProps {
  apikey: string;
  selectedPrefs: string[];
}

interface PopulationData {
  year: number;
  value: number;
}

type GraphDataType = {
  [year: string]: {
    year: number;
    [prefCode: string]: number | undefined;
  };
};

export const PopulationGraph: FC<PopulationGraphProps> = ({
  apikey,
  selectedPrefs,
}) => {
  // 各都道府県の人口データを格納
  const [populationData, setPopulationData] = useState<{
    [key: string]: PopulationData[];
  }>({});
  const [prefectureNames, setPrefectureNames] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 都道府県名を取得する
  useEffect(() => {
    const fetchPrefNames = async () => {
      try {
        const names = await fetchPrefectureNames(apikey);
        setPrefectureNames(names);
      } catch (e) {
        setError("Failed to fetch prefecture names");
      }
    };

    fetchPrefNames();
  }, [apikey]);

  // 選択した都道府県の人口データを取得し格納
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const newPopulationData: { [key: string]: PopulationData[] } = {};
      for (const prefCode of selectedPrefs) {
        try {
          const data = await fetchPopulationData(apikey, Number(prefCode));
          if (data.length === 0) {
            setError("Failed to fetch population data");
          } else {
            newPopulationData[prefCode] = data;
          }
        } catch (e) {
          setError(`Failed to fetch population data for prefCode: ${prefCode}`);
        }
      }
      setPopulationData(newPopulationData);
      setLoading(false);
    };
    fetchData();
  }, [selectedPrefs, apikey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 取得した人口データをRechartsで利用できる形に変換
  const generateGraphData = (): {
    year: number;
    [prefCode: string]: number | undefined;
  }[] => {
    const graphData: GraphDataType = {};

    // オブジェクトをエントリー（ペア）に変換して繰り返す
    for (const [prefCode, data] of Object.entries(populationData)) {
      data.forEach((yearData) => {
        // 年ごとのエントリがない場合は初期化する
        if (!graphData[yearData.year]) {
          graphData[yearData.year] = { year: yearData.year };
        }
        // 年ごとのエントリに都道府県のデータを追加
        graphData[yearData.year][prefCode] = yearData.value;
      });
    }

    // オブジェクトを配列に変換し年ごとにソート
    return Object.values(graphData).sort((a, b) => a.year - b.year);
  };

  // グラフデータを生成
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
          <CustomXAxis dataKey="year" />
          <CustomYAxis />
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
