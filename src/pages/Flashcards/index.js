import Sidebar from "./Sidebar/Sidebar";
import { Layout } from "antd";
import { useParams } from "react-router-dom";
import CardList from "./CardList";

const Flashcards = () => {
  const { category } = useParams();
  const decodedCategory = category ? decodeURIComponent(category) : category;

  return (
    <Layout style={{ background: "#fff" }} className="flex-grow-1">
      <Sidebar currentCategory={decodedCategory} />
      <CardList category={decodedCategory} />
    </Layout>
  );
};

export default Flashcards;
