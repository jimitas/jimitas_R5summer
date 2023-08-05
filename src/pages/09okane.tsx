import Layout from "@/components/Layout";
import { Okane } from "src/components/Okane";

export default function Home() {
  return (
    <Layout title="おかね">
      <Okane hyaku={0} goju={0} ju={0} go={0} ichi={0}></Okane>
    </Layout>
  );
}
