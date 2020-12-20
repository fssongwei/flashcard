import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import { useParams } from "react-router-dom";
import CardList from "./CardList";
const { Sider } = Layout;

const Flashcards = () => {
  const { category } = useParams();

  return (
    <Layout style={{ background: "#fff" }} className="flex-grow-1">
      {/* <Sider width={256}> */}
      <Sidebar currentCategory={category} />
      {/* </Sider> */}
      <CardList category={category} />
    </Layout>
  );
};

export default Flashcards;
