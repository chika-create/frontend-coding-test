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
  }, [prefCode, apikey]);

  // 選択された都道府県コードを管理するための状態
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  // チェックボックスの変更を処理する関数
  const handleCheckboxChange = (code: string) => {
    console.log("code: ", code);
    console.log("hoge");
    setSelectedPrefs((currentSelected) => {
      if (currentSelected.includes(code)) {
        // 既に選択されている場合は除去
        return currentSelected.filter((selectedCode) => selectedCode !== code);
      } else {
        // 選択されていない場合は追加
        return [...currentSelected, code];
      }
    });
  };

  return (
    <div>
      <h1>都道府県を選択してください</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {prefs.map((pref) => (
          <PrefecturesItem
            pref={pref}
            prefCode={Number(pref.prefCode)}
            key={pref.prefCode}
            selectedPrefs={selectedPrefs}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
    </div>
  );
};
