import React, { useEffect, useState } from 'react';
const API_KEY = import.meta.env.RESAS_API_KEY;
console.log("API_KEY: ",API_KEY);
/*
const fetchCities = async (prefCode: number) => {
  try {
    const response = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${prefCode}`,
      {
        headers: { 'X-API-KEY': API_KEY || '' }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

export const Prefectures: React.FC<{ prefCode: number }> = ({ prefCode }) => {
  const [cities, setCities] = useState<{ cityCode: string; cityName: string }[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const citiesData = await fetchCities(prefCode);
      if (citiesData.length === 0) {
        setError('Failed to fetch city data');
      }
      setCities(citiesData);
      setLoading(false);
    })();
  }, [prefCode]);

  const handleCheckboxChange = (cityCode: string) => {
    setSelectedCities(prevState =>
      prevState.includes(cityCode)
        ? prevState.filter(c => c !== cityCode)
        : [...prevState, cityCode]
    );
  };

  const isChecked = (cityCode: string) => selectedCities.includes(cityCode);

  return (
    <div>
      <h1>市区町村を選択してください</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cities.map(city => (
          <li key={city.cityCode}>
            <label>
              <input
                type="checkbox"
                checked={isChecked(city.cityCode)}
                onChange={() => handleCheckboxChange(city.cityCode)}
              />
              {city.cityName}
            </label>
          </li>
        ))}
      </ul>
      <h2>選択された市区町村:</h2>
      <ul>
        {selectedCities.map(cityCode => {
          const city = cities.find(c => c.cityCode === cityCode);
          return <li key={cityCode}>{city?.cityName}</li>;
        })}
      </ul>
    </div>
  );
};
*/
export const Prefectures: React.FC = () => {
    return (
        <div>hoge</div>
    )
};
