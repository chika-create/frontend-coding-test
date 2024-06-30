import { FC, useEffect, useState } from "react";
import { fetchPrefs } from "../../lib/fetchPrefs";
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
  const [prefs, setPrefs] = useState<{ prefCode: string; prefName: string }[]>(
    []
  );
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // 都道府県のデータを取得
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      const prefsData = await fetchPrefs(apikey);
      if (!prefsData || prefsData.length === 0) {
        setError(true);
      } else {
        setPrefs(prefsData);
      }
      setLoading(false);
    })();
  }, [apikey]);

  if (error) return null;

  return (
    <div>
      <h2>都道府県を選択してください</h2>
      {loading && <p>Loading...</p>}
      <ul>
        {prefs.map((pref) => (
          <PrefecturesItem
            key={pref.prefCode}
            pref={pref}
            selectedPrefs={selectedPrefs}
            // ↓これはcontextに置き換える
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
    </div>
  );
};
