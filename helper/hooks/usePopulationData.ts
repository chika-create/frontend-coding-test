import { useEffect, useState } from "react";
import { useFetchApiKey } from "../../helper/hooks/useFetchApiKey";
import { fetchPopulationData } from "../../lib/fetchPopulationData";

interface PopulationData {
  year: number;
  value: number;
}

export const usePopulationData = (checkedPrefs: string[]) => {
  const apikey = useFetchApiKey();
  const [populationDataLoading, setPopulationDataLoading] =
    useState<boolean>(false);
  const [populationDataError, setPopulationDataError] = useState<string | null>(
    null
  );
  const [populationData, setPopulationData] = useState<{
    [key: string]: PopulationData[];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!Array.isArray(checkedPrefs)) return;

      setPopulationDataLoading(true);
      setPopulationDataError(null);

      const newPopulationData: { [key: string]: PopulationData[] } = {};
      for (const prefCode of checkedPrefs) {
        try {
          const data = await fetchPopulationData(apikey, Number(prefCode));
          if (data.length === 0) {
            setPopulationDataError("Failed to fetch population data");
          } else {
            newPopulationData[prefCode] = data;
          }
        } catch (e) {
          setPopulationDataError(
            `Failed to fetch population data for prefCode: ${prefCode}`
          );
        }
      }
      setPopulationData(newPopulationData);
      setPopulationDataLoading(false);
    };
    fetchData();
  }, [checkedPrefs, apikey]);

  return { populationDataLoading, populationDataError, populationData };
};
