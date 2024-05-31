import { FC } from "react";

export const PrefecturesItem: FC<{
  pref: any;
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
          onChange={() => onCheckboxChange(pref.prefCode)}
        />
        {pref.prefName}
      </label>
    </li>
  );
};
