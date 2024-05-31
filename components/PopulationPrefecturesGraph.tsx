import { FC, useState } from "react";
import { Prefectures } from "./Prefectures";
import { PopulationGraph } from "./PopulationGraph";

export const PopulationPrefecturesGraph: FC<{
  apikey: string;
}> = ({ apikey }) => {
  const prefCode = 0;

  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (code: string) => {
    console.log("code: ", code);
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

  // 選択された都道府県コードを管理するための状態
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  return (
    <div>
      <Prefectures
        prefCode={prefCode}
        apikey={apikey}
        handleCheckboxChange={handleCheckboxChange}
        selectedPrefs={selectedPrefs}
      />
      <PopulationGraph />
    </div>
  );
};
