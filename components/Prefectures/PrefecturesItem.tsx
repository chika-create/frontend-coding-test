import { FC } from "react";

interface PrefecturesItemProps {
  pref: Prefecture;
  selectedPrefs: string[];
  onCheckboxChange: (code: string) => void;
}

// 都道府県の型を定義
interface Prefecture {
  prefCode: string;
  prefName: string;
}

export const PrefecturesItem: FC<PrefecturesItemProps> = ({
  pref,
  selectedPrefs,
  onCheckboxChange,
}) => {
  // 現在の都道府県が選択されているか確認
  const selectedFlag = selectedPrefs.includes(pref.prefCode);
  return (
    <li key={pref.prefCode}>
      <label>
        <input
          type="checkbox"
          checked={selectedFlag}
          value={pref.prefCode}
          onChange={() => onCheckboxChange(pref.prefCode)}
        />
        {pref.prefName}
      </label>
    </li>
  );
};
