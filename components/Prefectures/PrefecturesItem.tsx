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
  return (
    <li>
      <label>
        <input
          type="checkbox"
          // 現在の都道府県が選択されているか確認
          checked={selectedPrefs.includes(pref.prefCode)}
          value={pref.prefCode}
          onChange={() => onCheckboxChange(pref.prefCode)}
        />
        {pref.prefName}
      </label>
    </li>
  );
};
