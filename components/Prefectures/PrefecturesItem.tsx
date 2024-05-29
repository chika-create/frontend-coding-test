import { FC } from "react";

export const PrefecturesItem: FC<{
  pref: any;
  prefCode: number;
}> = ({ pref, prefCode }) => {
  return (
    <li key={pref.prefCode}>
      <label>
        {/* <input
          type="checkbox"
          checked={isChecked(pref.prefCode)}
          onChange={() => handleCheckboxChange(pref.prefCode)}
        /> */}
        {pref.prefName}
      </label>
    </li>
  );
};
