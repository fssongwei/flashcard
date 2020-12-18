import { useState } from "react";
import { Form, Modal, Button, Input } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";

const AddCategory = ({ mode, visible, setVisible, addCategory }) => {
  const [value, setValue] = useState("");
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (value === "") {
    } else {
      addCategory(value);
      setVisible(false);
    }
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  return (
    <>
      {(!mode || mode === "default") && (
        <Button
          type="block"
          onClick={showModal}
          icon={<AppstoreAddOutlined />}
          block
        >
          Add Category
        </Button>
      )}

      <Modal
        title="Add Category"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form.Item
          validateStatus={value === "" ? "error" : "success"}
          help={value === "" ? "required field" : ""}
        >
          <Input
            placeholder="Category Name"
            size="large"
            value={value}
            validateStatus="error"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Form.Item>
      </Modal>
    </>
  );
};

export default AddCategory;
