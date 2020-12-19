import { useState } from "react";
import { Select } from "antd";
import AddCategory from "./AddCategory";
import { useSelector } from "react-redux";

const { Option } = Select;

const CategorySelector = ({ category, setCategory }) => {
  const categories = useSelector((state) => state.categories);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const onChange = (value) => {
    if (value === "new") {
      setCategoryModalVisible(true);
    } else {
      setCategory(value);
    }
  };
  const addCategory = (category) => {
    setCategory(category);
  };

  return (
    <>
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Category"
        optionFilterProp="children"
        onChange={onChange}
        size="large"
        allowClear
        value={category}
      >
        <Option value="new">+ Add Category</Option>
        {categories.map((category) => {
          return (
            <Option value={category} key={category}>
              {category}
            </Option>
          );
        })}
      </Select>
      <AddCategory
        mode="noButton"
        visible={categoryModalVisible}
        setVisible={setCategoryModalVisible}
        addCategory={addCategory}
      />
    </>
  );
};

export default CategorySelector;
