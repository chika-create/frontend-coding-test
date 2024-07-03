import { FC, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { fetchPrefectureNames } from "../../lib/fetchPrefectureNames";
import { useFetchApiKey } from "../../helper/hooks/useFetchApiKey";
import { usePopulationData } from "../../helper/hooks/usePopulationData";

interface PopulationGraphProps {
  selectedPrefs: string[];
}

type GraphDataType = {
  [year: string]: {
    year: number;
    [prefCode: string]: number | undefined;
  };
};

export const PopulationGraph: FC<PopulationGraphProps> = ({
  selectedPrefs,
}) => {
  const apikey = useFetchApiKey();
  const [prefectureNames, setPrefectureNames] = useState<{
    [key: string]: string;
  }>({});

  // 都道府県名を取得する
  useEffect(() => {
    const fetchPrefNames = async () => {
      try {
        const names = await fetchPrefectureNames(apikey);
        setPrefectureNames(names);
      } catch (e) {
        console.error("Failed to fetch prefecture names");
      }
    };

    fetchPrefNames();
  }, [apikey]);

  // 選択した都道府県の人口データを取得し格納
  const { loading, error, populationData } = usePopulationData(selectedPrefs);
  console.log("populationData: ", populationData);

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
            return <li key={prefCode}>{prefectureNames[prefCode]}</li>;
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
          <XAxis
            dataKey="year"
            label={{ value: "年度", position: "insideBottomRight", offset: 0 }}
          />
          <YAxis
            label={{ value: "人口", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          {Object.keys(populationData).map((prefCode, index) => (
            <Line
              key={prefCode}
              type="monotone"
              dataKey={prefCode}
              name={prefectureNames[prefCode]}
              stroke={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
