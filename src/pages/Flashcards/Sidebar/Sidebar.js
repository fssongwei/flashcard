import { useState } from "react";
import { Menu, Button, Layout } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppstoreAddOutlined, RocketOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Filter from "./Filter";

const { Sider } = Layout;

const Sidebar = ({ currentCategory }) => {
  let categories = useSelector((state) => state.categories);
  let flashcards = useSelector((state) => state.flashcards);
  let history = useHistory();

  const randomOne = () => {
    let i = Math.floor(Math.random() * flashcards.length);
    let url = `/flashcard/${flashcards[i]._id}`;
    history.push(url);
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ backgroundColor: "#000" }}
      zeroWidthTriggerStyle={{
        backgroundColor: "#1890ff",
        color: "#fff",
        position: "fixed",
        left: "0",
        top: "66px",
      }}
      width="256"
    >
      <Menu
        mode="inline"
        style={{ width: "100%", height: "100%", paddingTop: "50px" }}
        className="pt-6"
        selectedKeys={[currentCategory]}
      >
        <Menu.Item key="Dashboard">
          <Link to="/">All</Link>
        </Menu.Item>
        {categories.map((category) => {
          return (
            <Menu.Item key={category}>
              <Link to={`/categories/${encodeURIComponent(category)}`}>
                {category}
              </Link>
            </Menu.Item>
          );
        })}
        <div className="p-3">
          <Link to="/add">
            <Button icon={<AppstoreAddOutlined />} block>
              Create A Flashcard
            </Button>
          </Link>

          <div className="my-3">
            <Filter />
          </div>
        </div>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
