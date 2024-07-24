import { FC, Suspense } from "react";
import { PopulationGraphFetching } from "./PopulationGraphFetching";

export const PopulationGraph: FC = () => {
  return (
    <Suspense fallback={<div>Loading graph...</div>}>
      <PopulationGraphFetching />
    </Suspense>
  );
};
