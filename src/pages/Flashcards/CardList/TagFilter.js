import { Select } from "antd";
const { Option } = Select;

const TagFilter = ({ tags, selectedTags, setSelectedTags }) => {
  const handleChange = (selectedTags) => {
    setSelectedTags(selectedTags);
  };

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      placeholder="Tag Filter: All"
      onChange={handleChange}
      size="large"
      value={selectedTags}
    >
      {tags.map((tag) => {
        return <Option key={tag}>{tag}</Option>;
      })}
    </Select>
  );
};

export default TagFilter;
