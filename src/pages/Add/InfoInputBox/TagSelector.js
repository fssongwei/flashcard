import { Form, Select } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;

const TagSelector = () => {
  const allTags = useSelector((state) => state.tags);

  return (
    <Form.Item name="tags">
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Tags"
        size="large"
      >
        {allTags.map((tag) => {
          return <Option key={tag}>{tag}</Option>;
        })}
      </Select>
    </Form.Item>
  );
};

export default TagSelector;
