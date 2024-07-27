import { FC, useEffect } from "react";
import { CheckboxProvider } from "../helper/context/SelectedPrefsContext";
import { Prefectures } from "./Prefectures";
import { PopulationGraph } from "./PopulationGraph";

export const PopulationPrefecturesGraph: FC = () => {
  // 状態確認用のログ
  // useEffect(() => {
  //   console.log("更新された checkedPrefs: ", checkedPrefs);
  // }, [checkedPrefs]);

  return (
    <div>
      <CheckboxProvider>
        <Prefectures />
        <PopulationGraph />
      </CheckboxProvider>
    </div>
  );
};
