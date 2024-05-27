import type { MetaFunction } from "@remix-run/node";
import { Prefectures } from "../../components/Prefectures"

export const meta: MetaFunction = () => {
  return [
    { title: "都道府県別の総人口推移グラフ" },
    { name: "description", content: "都道府県別の総人口推移グラフを表示するサービスです。" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>都道府県別の総人口推移グラフ</h1>
      <Prefectures />
    </div>
  );
}
