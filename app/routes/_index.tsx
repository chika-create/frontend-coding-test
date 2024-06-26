import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { PopulationPrefecturesGraph } from "../../components/PopulationPrefecturesGraph";

export const meta: MetaFunction = () => {
  return [
    { title: "都道府県別の総人口推移グラフ" },
    {
      name: "description",
      content: "都道府県別の総人口推移グラフを表示するサービスです。",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const API_KEY = process.env.RESAS_API_KEY;
  return { apiKey: API_KEY };
};

export default function Index() {
  const { apiKey: apikey } = useLoaderData<{ apiKey: string }>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>都道府県別の総人口推移グラフ</h1>
      <PopulationPrefecturesGraph apikey={apikey} />
    </div>
  );
}
