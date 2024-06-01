import { FC } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{name: 'A', uv: 400, pv: 2400, amt: 2400}, {name: 'B', uv: 800, pv: 3000, amt: 2600}, {name: 'C', uv: 300, pv: 2000, amt: 2000}];

export const PopulationGraph: FC = () => {
  // const [prefs, setprefs] = useState<{ prefCode: string; prefName: string }[]>(
  //   []
  // );
  // const [selectedprefs, setSelectedprefs] = useState<string[]>([]);

  return (
    <>
      <div>
        <h2>選択された都道府県:</h2>
        <ul>
          {/* {selectedprefs.map((prefCode) => {
            const pref = prefs.find((c) => c.prefCode === prefCode);
            return <li key={prefCode}>{pref?.prefName}</li>;
          })} */}
        </ul>
      </div>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  );
};
