import { Layout, Menu, Button, Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const { Header } = Layout;

const userMenu = (user) => {
  return (
    <Menu>
      <Menu.ItemGroup style={{ color: "#000" }}>
        Welcome, {user.name}
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item>
        <a href="/auth/logout">
          <LogoutOutlined /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );
};

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <>
      <Header
        style={{
          backgroundColor: "#fff",
          position: "fixed",
          width: "100%",
          zIndex: "1",
          borderBottom: "1px solid lightgrey",
        }}
        className="px-3 px-md-5 d-flex justify-content-between align-items-center"
      >
        <Button
          type="primary"
          style={{ borderRadius: "4px", fontFamily: "monospace" }}
          onClick={() => history.push("/")}
        >
          Flashcard
        </Button>

        {user && (
          <Dropdown overlay={userMenu(user)} trigger="click">
            <Avatar size="large" src={user.avatar} />
          </Dropdown>
        )}
      </Header>
      <div style={{ paddingTop: "64px" }}></div>
    </>
  );
};

export default Navbar;
