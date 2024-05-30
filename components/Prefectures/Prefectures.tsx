import { FC, useEffect, useState } from "react";
import { fetchprefs } from "../../lib/fetchResasToken";
import { PrefecturesItem } from "./PrefecturesItem";

export const Prefectures: FC<{
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
      const prefsData = await fetchprefs(API_KEY);
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
        {prefs.map((pref, index) => (
          <PrefecturesItem pref={pref} prefCode={prefCode} key={index} />
        ))}
      </ul>
    </div>
  );
};
