import { Layout, Menu, Button, Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
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

  return (
    <>
      <Header
        style={{
          backgroundColor: "#fff",
          position: "fixed",
          width: "100%",
          zIndex: "1",
          padding: 0,
        }}
      >
        <Menu
          mode="horizontal"
          selectable={false}
          style={{ padding: "0 100px" }}
        >
          <Link to="/">
            <Button
              type="primary"
              style={{ borderRadius: "4px", fontFamily: "monospace" }}
            >
              Flashcard
            </Button>
          </Link>

          {user && (
            <Menu.Item style={{ float: "right" }}>
              <Dropdown overlay={userMenu(user)} trigger="click">
                <Avatar size="large" src={user.avatar} />
              </Dropdown>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <div style={{ paddingTop: "64px" }}></div>
    </>
  );
};

export default Navbar;
