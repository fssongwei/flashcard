import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header
      style={{
        backgroundColor: "#fff",
        position: "fixed",
        width: "100%",
        zIndex: "1",
      }}
      className="p-0"
    >
      <Menu mode="horizontal" className="px-6" selectable={false}>
        <Link to="/">
          <Button
            type="primary"
            style={{ borderRadius: "4px", fontFamily: "monospace" }}
          >
            Flashcard
          </Button>
        </Link>
        {/* <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item> */}

        <Menu.Item style={{ float: "right" }}>
          <Link to="/add">add</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
