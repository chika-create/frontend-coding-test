import { FC } from "react";

export const ErrorMessage: FC<{ error: string }> = ({ error }) => (
  <p style={{ color: "red" }}>{error}</p>
);
