import { FC } from "react";

// 都道府県の型を定義
interface Prefecture {
  prefCode: string;
  prefName: string;
}

export const PrefecturesItem: FC<{
  pref: Prefecture;
  prefCode: string;
  selectedPrefs: string[];
  onCheckboxChange: (code: string) => void;
}> = ({ pref, prefCode, selectedPrefs, onCheckboxChange }) => {
  // 現在の都道府県が選択されているか確認
  const isChecked = selectedPrefs.includes(prefCode);
  return (
    <li key={prefCode}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          value={prefCode}
          onChange={() => onCheckboxChange(prefCode)}
        />
        {pref.prefName}
      </label>
    </li>
  );
};
