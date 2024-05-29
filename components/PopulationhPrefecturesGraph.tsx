import { FC, useEffect, useState } from "react";
import { fetchprefs } from "../lib/fetchResasToken";
import { Prefectures } from "./Prefectures";
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
      <Prefectures prefCode={prefCode} apikey={apikey} />
      <PopulationGraph prefCode={prefCode} />
    </div>
  );
};
