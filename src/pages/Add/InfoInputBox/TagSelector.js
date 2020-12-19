import { Select } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;

const TagSelector = ({ tags, setTags }) => {
  const allTags = useSelector((state) => state.tags);

  const handleChange = (selectedTags) => {
    setTags(selectedTags);
  };

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      placeholder="Tags"
      onChange={handleChange}
      size="large"
      value={tags}
    >
      {allTags.map((tag) => {
        return <Option key={tag}>{tag}</Option>;
      })}
    </Select>
  );
};

export default TagSelector;
