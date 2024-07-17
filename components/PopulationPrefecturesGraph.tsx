import { FC, useState, useEffect } from "react";
import { CheckboxProvider } from "../helper/context/SelectedPrefsContext";
import { Prefectures } from "./Prefectures";
import { PopulationGraph } from "./PopulationGraph";

export const PopulationPrefecturesGraph: FC = () => {
  // const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  // チェックボックスの変更を処理する関数
  // const handleCheckboxChange = (code: string) => {
  //   setSelectedPrefs((currentSelected) => {
  //     if (currentSelected.includes(code)) {
  //       // 既に選択されている場合は削除
  //       return currentSelected.filter((selectedCode) => selectedCode !== code);
  //     } else {
  //       // 選択されていない場合は追加
  //       return [...currentSelected, code];
  //     }
  //   });
  // };

  // 状態確認用のログ
  // useEffect(() => {
  //   console.log("更新された selectedPrefs: ", selectedPrefs);
  // }, [selectedPrefs]);

  return (
    <div>
      <CheckboxProvider>
        <Prefectures />
        <PopulationGraph />
      </CheckboxProvider>
    </div>
  );
};
