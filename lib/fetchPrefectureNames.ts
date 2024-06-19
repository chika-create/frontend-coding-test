export async function fetchPrefectureNames(
  apikey: string
): Promise<{ [key: string]: string }> {
  const response = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": apikey,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prefecture names");
  }

  const data = await response.json();

  const prefectureNames: { [key: string]: string } = {};
  data.result.forEach((prefecture: { prefCode: number; prefName: string }) => {
    prefectureNames[prefecture.prefCode] = prefecture.prefName;
  });

  return prefectureNames;
}
