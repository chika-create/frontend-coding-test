import { FC } from "react";
import { PrefectureInterface, SelectedPrefsType } from "../../types/types"

interface PrefecturesItemProps {
  pref: PrefectureInterface;
  selectedPrefs: SelectedPrefsType;
  onCheckboxChange: (code: string) => void;
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
