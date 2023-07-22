// import { Layout } from "src/components/Layout/Layout";
// import { Hide } from "src/components/Hide";

// export default function Home() {
//   return (
//     <Layout title="ぶろっく">
//       <Block a={10} b={10} />
//       <Hide />
//     </Layout>
//   );
// }

import React from "react";
import Layout from "@/components/Layout";
import { Block } from "@/components/Block";
// Add imports for Block and Hide components if they are used

const Home: React.FC = () => {
  return (
    <Layout title="ぶろっく">
      <Block a={10} b={10} />
    </Layout>
  );
};

export default Home;
