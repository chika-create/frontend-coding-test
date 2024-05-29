import { FC, useEffect, useState } from "react";
import { fetchprefs } from "../lib/fetchResasToken";
import { PopulationGraph } from "./PopulationGraph";

export const PopulationPrefecturesGraph: FC<{
  prefCode: number;
  apikey: string;
}> = ({ prefCode, apikey }) => {
  const [prefs, setprefs] = useState<{ prefCode: string; prefName: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const API_KEY = apikey;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const prefsData = await fetchprefs(prefCode, API_KEY);
      if (!prefsData || prefsData.length === 0) {
        setError("Failed to fetch pref data");
      } else {
        setprefs(prefsData);
      }
      setLoading(false);
    })();
  }, [prefCode]);

  // const handleCheckboxChange = (prefCode: string) => {
  //   setSelectedprefs((prevState) =>
  //     prevState.includes(prefCode)
  //       ? prevState.filter((c) => c !== prefCode)
  //       : [...prevState, prefCode]
  //   );
  // };

  // const isChecked = (prefCode: string) => selectedprefs.includes(prefCode);

  return (
    <div>
      <h1>都道府県を選択してください</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {prefs.map((pref) => (
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
        ))}
      </ul>
      <PopulationGraph prefCode={prefCode} />
    </div>
  );
};
