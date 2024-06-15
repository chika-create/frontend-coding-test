import { FC, useState, useEffect } from "react";
import { Prefectures } from "./Prefectures";
import { PopulationGraph } from "./PopulationGraph";

export const PopulationPrefecturesGraph: FC<{
  apikey: string;
}> = ({ apikey }) => {
  // この状態が更新されたら、useEffect内のログが実行されます
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

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

  return (
    <div>
      <Prefectures
        apikey={apikey}
        handleCheckboxChange={handleCheckboxChange}
        selectedPrefs={selectedPrefs}
      />
      <PopulationGraph apikey={apikey} selectedPrefs={selectedPrefs} />
    </div>
  );
};
