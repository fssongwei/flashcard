import CategorySelector from "./CategorySelector";
import TagSelector from "./TagSelector";
import { Input } from "antd";

const InfoInputBox = ({
  title,
  setTitle,
  tags,
  setTags,
  category,
  setCategory,
}) => {
  return (
    <>
      <div className="d-flex mb-3">
        <div className="flex-grow-1 me-3">
          <Input
            placeholder="Title"
            size="large"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ width: "20%" }}>
          <CategorySelector category={category} setCategory={setCategory} />
        </div>
      </div>
      <TagSelector tags={tags} setTags={setTags} />
    </>
  );
};

export default InfoInputBox;
