import { FC } from "react";
import { useGetPrefectureData } from "../../helper/hooks/useGetPrefectureData"
import { PrefecturesItem } from "./PrefecturesItem";

interface PrefecturesProps {
  handleCheckboxChange: (code: string) => void;
  selectedPrefs: string[];
}

export const Prefectures: FC<PrefecturesProps> = ({
  handleCheckboxChange,
  selectedPrefs,
}) => {

  // 都道府県のデータを取得
  const { loading, error, prefs } = useGetPrefectureData();

  if (error) return null;

  return (
    <div>
      <h2>都道府県を選択してください</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {prefs.map((pref) => (
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
