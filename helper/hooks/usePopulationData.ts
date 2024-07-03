import { useEffect, useState } from "react";
import { useFetchApiKey } from "../../helper/hooks/useFetchApiKey";
import { fetchPopulationData } from "../../lib/fetchPopulationData";

interface PopulationData {
  year: number;
  value: number;
}

export const usePopulationData = ({ selectedPrefs }: any) => {
  const apikey = useFetchApiKey();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [populationData, setPopulationData] = useState<{
    [key: string]: PopulationData[];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const newPopulationData: { [key: string]: PopulationData[] } = {};
      for (const prefCode of selectedPrefs) {
        try {
          const data = await fetchPopulationData(apikey, Number(prefCode));
          if (data.length === 0) {
            setError("Failed to fetch population data");
          } else {
            newPopulationData[prefCode] = data;
          }
        } catch (e) {
          setError(`Failed to fetch population data for prefCode: ${prefCode}`);
        }
      }
      setPopulationData(newPopulationData);
      setLoading(false);
    };
    fetchData();
  }, [selectedPrefs, apikey]);

  return { loading, error, populationData };
};
