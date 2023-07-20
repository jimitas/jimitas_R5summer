import React from "react";
import MainTitle from "@/components/MainTitle";
import Layout from "@/components/Layout";
import Links from "@/components/Links";

const Home: React.FC = () => {
  return (
    <Layout title="">
      <MainTitle />
      <br />
      <Links />
    </Layout>
  );
};

export default Home;
