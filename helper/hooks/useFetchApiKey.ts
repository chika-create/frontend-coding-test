import { useLoaderData } from "@remix-run/react";

export const useFetchApiKey = () => {
  const { apiKey: apikey } = useLoaderData<{ apiKey: string }>();
  return apikey;
};
