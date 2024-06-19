import { XAxis, XAxisProps } from "recharts";

const customXAxis = ({ type = "number", ...props }: XAxisProps) => {
  return <XAxis type={type} {...props} />;
};

export default customXAxis;
