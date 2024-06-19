import { YAxis, YAxisProps } from "recharts";

const customYAxis = ({ type = "number", ...props }: YAxisProps) => {
  return <YAxis type={type} {...props} />;
};

export default customYAxis;
