import Layout from "@/components/Layout";
import { Keisanbou } from "src/components/Keisanbou";

export default function Home() {
  return (
    <Layout title="けいさんぼう">
      <Keisanbou hyaku={0} ju={0} ichi={0}></Keisanbou>
    </Layout>
  );
}
