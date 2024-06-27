export const fetchPrefs = async (API_KEY: string) => {
  try {
    const response = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
      {
        headers: { "X-API-KEY": API_KEY || "" },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching api:", error);
    return [];
  }
};
