import { FC, useState } from "react";

export const PopulationGraph: FC<{
  prefCode: number;
}> = ({ prefCode }) => {
  const [prefs, setprefs] = useState<{ prefCode: string; prefName: string }[]>(
    []
  );
  // const [selectedprefs, setSelectedprefs] = useState<string[]>([]);

  return (
    <div>
      <h2>選択された都道府県:</h2>
      <ul>
        {/* {selectedprefs.map((prefCode) => {
          const pref = prefs.find((c) => c.prefCode === prefCode);
          return <li key={prefCode}>{pref?.prefName}</li>;
        })} */}
      </ul>
    </div>
  );
};
