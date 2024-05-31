import { FC } from "react";
import { Prefectures } from "./Prefectures";
import { PopulationGraph } from "./PopulationGraph";

export const PopulationPrefecturesGraph: FC<{
  apikey: string;
}> = ({ apikey }) => {
  const prefCode = 0;

  return (
    <div>
      <Prefectures prefCode={prefCode} apikey={apikey} />
      <PopulationGraph />
    </div>
  );
};
