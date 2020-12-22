import { Form, AutoComplete } from "antd";
import { useSelector } from "react-redux";

const CategorySelector = () => {
  const categories = useSelector((state) => state.categories);

  const options = categories.map((category) => {
    return { value: category };
  });

  return (
    <>
      <Form.Item
        name="category"
        rules={[{ required: true, message: "required" }]}
      >
        <AutoComplete
          style={{ width: "100%" }}
          placeholder="Category"
          size="large"
          options={options}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
    </>
  );
};

export default CategorySelector;
