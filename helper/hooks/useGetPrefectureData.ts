import { useEffect, useState } from "react";
import { PrefectureInterface } from "../../types/types"
import { useFetchApiKey } from "../../helper/hooks/useFetchApiKey";
import { fetchPrefs } from "../../lib/fetchPrefs";

export const useGetPrefectureData = () => {
  const apikey = useFetchApiKey();
  const [prefectureDataLoading, setPrefectureDataLoading] =
    useState<boolean>(true);
  const [prefectureDataError, setPrefectureDataError] =
    useState<boolean>(false);
  const [prefectureData, setPrefectureData] = useState<PrefectureInterface[]>([]);
  useEffect(() => {
    (async () => {
      setPrefectureDataLoading(true);
      setPrefectureDataError(false);
      const prefsData = await fetchPrefs(apikey);
      if (!prefsData || prefsData.length === 0) {
        setPrefectureDataError(true);
      } else {
        setPrefectureData(prefsData);
      }
      setPrefectureDataLoading(false);
    })();
  }, [apikey]);

  return { prefectureDataLoading, prefectureDataError, prefectureData };
};
