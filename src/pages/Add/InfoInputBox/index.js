import CategorySelector from "./CategorySelector";
import TagSelector from "./TagSelector";
import { Form, Input } from "antd";

const InfoInputBox = () => {
  return (
    <>
      <div className="d-flex">
        <div className="flex-grow-1 me-3">
          <Form.Item
            rules={[{ required: true, message: "required" }]}
            name="title"
          >
            <Input placeholder="Title" size="large" />
          </Form.Item>
        </div>
        <div style={{ width: "20%" }}>
          <CategorySelector />
        </div>
      </div>
      <TagSelector />
    </>
  );
};

export default InfoInputBox;
