import { FC, useEffect, useState } from "react";
import { fetchprefs } from "../lib/fetchResasToken";
import { Prefectures } from "./Prefectures";
import { PopulationGraph } from "./PopulationGraph";

export const PopulationPrefecturesGraph: FC<{
  apikey: string;
}> = ({ apikey }) => {
  const [prefs, setprefs] = useState<{ prefCode: string; prefName: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const API_KEY = apikey;
  const prefCode = 0;

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
  }, []);

  return (
    <div>
      <Prefectures prefCode={prefCode} apikey={apikey} />
      <PopulationGraph />
    </div>
  );
};
