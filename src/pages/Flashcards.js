import TagSidebar from "../components/TagSidebar";
import { Layout, Typography, Steps, Button, Input } from "antd";
const { Sider, Content, Footer } = Layout;

const Flashcard = () => {
  return (
    <Layout style={{ height: "100vh", background: "#fff" }}>
      <Sider width={256}>
        <TagSidebar />
      </Sider>
      <Content className="px-6" style={{ marginTop: "64px" }}></Content>
    </Layout>
  );
};

export default Flashcard;
