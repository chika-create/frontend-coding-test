import { FC, useEffect, useState } from "react";
import { fetchprefs } from "../../lib/fetchResasToken";
import { useFetchApiKey } from "../../helper/hooks/useFetchApiKey";
import { PrefecturesItem } from "./PrefecturesItem";

interface PrefecturesProps {
  handleCheckboxChange: (code: string) => void;
  selectedPrefs: string[];
}

export const Prefectures: FC<PrefecturesProps> = ({
  handleCheckboxChange,
  selectedPrefs,
}) => {
  const apikey = useFetchApiKey();
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
  }, [apikey]);

  return (
    <div>
      <h2>都道府県を選択してください</h2>
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
