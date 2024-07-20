import { FC } from "react";
import { SelectedPrefsType } from "../../types/types"
import { useGetPrefectureData } from "../../helper/hooks/useGetPrefectureData";
import { PrefecturesItem } from "./PrefecturesItem";

interface PrefecturesProps {
  handleCheckboxChange: (code: string) => void;
  selectedPrefs: SelectedPrefsType;
}

export const Prefectures: FC<PrefecturesProps> = ({
  handleCheckboxChange,
  selectedPrefs,
}) => {
  // 都道府県のデータを取得
  const { prefectureDataLoading, prefectureDataError, prefectureData } =
    useGetPrefectureData();

  if (prefectureDataError) return null;

  return (
    <div>
      <h2>都道府県を選択してください</h2>
      {prefectureDataLoading && <p>Loading...</p>}
      <ul>
        {prefectureData.map((pref) => (
          <PrefecturesItem
            key={pref.prefCode}
            pref={pref}
            selectedPrefs={selectedPrefs}
            // ↓これはcontextに置き換える
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
    </div>
  );
};
