import { useState } from "react";
import { Menu, Button } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppstoreAddOutlined } from "@ant-design/icons";

const Sidebar = ({ currentCategory }) => {
  let categories = useSelector((state) => state.categories);

  return (
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
            <Link to={`/categories/${category}`}>
              {decodeURIComponent(category)}
            </Link>
          </Menu.Item>
        );
      })}
      <div className="p-3">
        <Link to="/add">
          <Button type="block" icon={<AppstoreAddOutlined />} block>
            Create A Flashcard
          </Button>
        </Link>
      </div>
    </Menu>
  );
};

export default Sidebar;
