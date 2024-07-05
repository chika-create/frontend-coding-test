import { FC } from "react";
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
import { usePopulationData } from "../../helper/hooks/usePopulationData";
import { useGetPrefectureData } from "../../helper/hooks/useGetPrefectureData";

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
  // 都道府県のデータを取得
  const { prefectureDataLoading, prefectureDataError, prefectureData } =
    useGetPrefectureData();

  // 選択した都道府県の人口データを取得し格納
  const { populationDataLoading, populationDataError, populationData } =
    usePopulationData(selectedPrefs);

  if (prefectureDataLoading || populationDataLoading) return <p>Loading...</p>;
  if (prefectureDataError || populationDataError)
    return (
      <>
        <p style={{ color: "red" }}>{prefectureDataError}</p>
        <p style={{ color: "red" }}>{populationDataError}</p>
      </>
    );

  const prefectureNames = prefectureData.reduce((accumulator, pref) => {
    accumulator[pref.prefCode] = pref.prefName;
    return accumulator;
  }, {} as { [key: string]: string });

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
