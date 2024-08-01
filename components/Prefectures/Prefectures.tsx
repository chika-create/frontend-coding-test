import { FC } from "react";
import { useCheckboxContext } from "../../helper/context/SelectedPrefsContext";
import { useGetPrefectureData } from "../../helper/hooks/useGetPrefectureData";
import { PrefecturesItem } from "./PrefecturesItem";
import { css } from "@linaria/core";

const prefectureList = css`
  display: flex;
`;

export const Prefectures: FC = () => {
  const { selectedPrefs, updateSelectedPrefectures } = useCheckboxContext();

  // 都道府県のデータを取得
  const { prefectureDataLoading, prefectureDataError, prefectureData } =
    useGetPrefectureData();

  if (prefectureDataError) return null;

  return (
    <div>
      <h2>都道府県を選択してください</h2>
      {prefectureDataLoading && <p>Loading...</p>}
      <ul className={prefectureList}>
        {prefectureData.map((pref) => (
          <PrefecturesItem
            key={pref.prefCode}
            pref={pref}
            selectedPrefs={selectedPrefs}
            onCheckboxChange={updateSelectedPrefectures}
          />
        ))}
      </ul>
    </div>
  );
};
