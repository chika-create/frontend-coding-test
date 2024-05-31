import { FC } from "react";

// 都道府県の型を定義
interface Prefecture {
  prefCode: string;
  prefName: string;
}

export const PrefecturesItem: FC<{
  pref: Prefecture;
  prefCode: number;
  selectedPrefs: string[];
  onCheckboxChange: (code: string) => void;
}> = ({ pref, selectedPrefs, onCheckboxChange }) => {
  // 現在の都道府県が選択されているか確認
  const isChecked = selectedPrefs.includes(pref.prefCode);
  console.log(pref.prefCode);
  return (
    <li key={pref.prefCode}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          value={pref.prefCode}
          onChange={() => onCheckboxChange(pref.prefCode)}
        />
        {pref.prefName}
      </label>
    </li>
  );
};
