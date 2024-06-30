import { useEffect, useState } from "react";
import { useFetchApiKey } from "../../helper/hooks/useFetchApiKey";
import { fetchPrefs } from "../../lib/fetchPrefs";

export const useGetPrefectureData = () => {
    const apikey = useFetchApiKey();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [prefs, setPrefs] = useState<{ prefCode: string; prefName: string }[]>(
        []
    );
    
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

    return {loading, error, prefs}
  };
