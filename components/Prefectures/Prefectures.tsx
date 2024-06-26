import { FC, useEffect, useState } from "react";
import { fetchprefs } from "../../lib/fetchResasToken";
import { PrefecturesItem } from "./PrefecturesItem";

export const Prefectures: FC<{
  apikey: string;
  handleCheckboxChange: (code: string) => void;
  selectedPrefs: string[];
}> = ({ apikey, handleCheckboxChange, selectedPrefs }) => {
  const [prefs, setprefs] = useState<{ prefCode: string; prefName: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const prefsData = await fetchprefs(apikey);
      if (!prefsData || prefsData.length === 0) {
        setError("Failed to fetch pref data");
      } else {
        setprefs(prefsData);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1>都道府県を選択してください</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {prefs.map((pref) => (
          <PrefecturesItem
            key={pref.prefCode}
            pref={pref}
            selectedPrefs={selectedPrefs}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
    </div>
  );
};
