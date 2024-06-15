export const fetchPopulationData = async (apiKey: string, prefCode: number) => {
    try {
      const response = await fetch(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
        {
          headers: { 'X-API-KEY': apiKey }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.result.data[0].data; // 年度別人口データを返す
    } catch (error) {
      console.error('Error fetching population data:', error);
      return [];
    }
  };
  