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
import { useCheckboxContext } from "../../helper/context/SelectedPrefsContext";
import { usePopulationData } from "../../helper/hooks/usePopulationData";
import { useGetPrefectureData } from "../../helper/hooks/useGetPrefectureData";
import { ErrorMessage } from "../common/ErrorMessage";

type GraphDataType = {
  [year: string]: {
    year: number;
    [prefCode: string]: number | undefined;
  };
};

export const PopulationGraphFetching: FC = () => {
  const { checkedPrefs } = useCheckboxContext();
  const { prefectureDataLoading, prefectureDataError, prefectureData } =
    useGetPrefectureData();
  const { populationDataLoading, populationDataError, populationData } =
    usePopulationData(checkedPrefs.map((pref) => pref.code));

  if (prefectureDataLoading || populationDataLoading) return <p>Loading...</p>;
  if (prefectureDataError || populationDataError) {
    const errorMessage =
      (prefectureDataError && prefectureDataError.toString()) ||
      (populationDataError && populationDataError.toString()) ||
      "エラーが発生しました";
    return <ErrorMessage error={errorMessage} />;
  }

  const prefectureNames = prefectureData.reduce((accumulator, pref) => {
    accumulator[pref.prefCode] = pref.prefName;
    return accumulator;
  }, {} as { [key: string]: string });

  const generateGraphData = (): {
    year: number;
    [prefCode: string]: number | undefined;
  }[] => {
    const graphData: GraphDataType = {};

    for (const [prefCode, data] of Object.entries(populationData)) {
      data.forEach((yearData) => {
        if (!graphData[yearData.year]) {
          graphData[yearData.year] = { year: yearData.year };
        }
        graphData[yearData.year][prefCode] = yearData.value;
      });
    }

    return Object.values(graphData).sort((a, b) => a.year - b.year);
  };

  const prefectureCodes = Object.keys(populationData);
  const graphData = generateGraphData();

  return (
    <>
      <div>
        <h2>選択された都道府県:</h2>
        <ul>
          {checkedPrefs.map((pref) => (
            <li key={pref.code}>{pref.name}</li>
          ))}
        </ul>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
          {prefectureCodes.map((prefCode, index) => (
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
