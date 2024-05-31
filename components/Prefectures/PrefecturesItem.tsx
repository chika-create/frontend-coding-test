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
}> = ({ pref, prefCode, selectedPrefs, onCheckboxChange }) => {
  // チェック状態を反映するための関数
  const isChecked = selectedPrefs.includes(prefCode);
  console.log(pref.prefCode);
  return (
    <li key={pref.prefCode}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          value={pref.prefCode}
          onChange={(e) => onCheckboxChange(e.target.value)}
        />
        {pref.prefName}
      </label>
    </li>
  );
};
