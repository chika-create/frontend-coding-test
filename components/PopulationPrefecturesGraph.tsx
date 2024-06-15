import { FC, useState, useEffect } from "react";
import { Prefectures } from "./Prefectures";
import { PopulationGraph } from "./PopulationGraph";

export const PopulationPrefecturesGraph: FC<{
  apikey: string;
}> = ({ apikey }) => {
  // この状態が更新されたら、useEffect内のログが実行されます
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
  const [populationData, setPopulationData] = useState<Record<string, any[]>>({});

  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (code: string) => {
    setSelectedPrefs((currentSelected) => {
      if (currentSelected.includes(code)) {
        // 既に選択されている場合は除去
        return currentSelected.filter((selectedCode) => selectedCode !== code);
      } else {
        // 選択されていない場合は追加
        return [...currentSelected, code];
      }
    });
  };

  // 状態確認用のログ
  // useEffect(() => {
  //   console.log("更新された selectedPrefs: ", selectedPrefs);
  // }, [selectedPrefs]);

  const fetchPopulationData = async (prefCode: string, apiKey: string) => {
    const response = await fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
      headers: {
        'X-API-KEY': apiKey,
      },
    });
    const result = await response.json();
    return result.result.data[0].data;  // ここでは総人口データを返しています。
  };

  // 選択された都道府県が変更されたときにデータを取得する
  useEffect(() => {
    const fetchData = async () => {
      const newPopulationData: Record<string, any[]> = {};

      for (const prefCode of selectedPrefs) {
        try {
          const data = await fetchPopulationData(prefCode, apikey);
          newPopulationData[prefCode] = data;
        } catch (error) {
          console.error(`Error fetching data for prefCode ${prefCode}:`, error);
        }
      }

      setPopulationData(newPopulationData);
    };

    if (selectedPrefs.length > 0) {
      fetchData();
    }
  }, [selectedPrefs, apikey]);

  return (
    <div>
      <Prefectures
        apikey={apikey}
        handleCheckboxChange={handleCheckboxChange}
        selectedPrefs={selectedPrefs}
      />
      <PopulationGraph populationData={populationData} />
    </div>
  );
};
