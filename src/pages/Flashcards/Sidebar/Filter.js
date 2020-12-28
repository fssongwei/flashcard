import { useState } from "react";
import {
  Modal,
  Radio,
  Select,
  Checkbox,
  InputNumber,
  Switch,
  Tooltip,
  Form,
  message,
} from "antd";
import { RocketOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
const { Option } = Select;

const Filter = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFormSubmit = async (values) => {
    try {
      if (values.categories[0] === "All Categories") delete values.categories;
      if (values.tags[0] === "All Tags") delete values.tags;
      if (values.amount === "unlimited") delete values.amount;
      let cardList = (await axios.post("/api/review", values)).data;
      if (cardList.length > 0) {
        history.push({
          pathname: `/flashcard/${cardList[0]}`,
          cardList: cardList,
        });
      } else {
        message.error("No flashcard meet the filter requirement");
      }
    } catch (error) {
      message.error(error.toString());
      console.log(error);
    }
  };

  // categories
  const flashcards = useSelector((state) => state.flashcards);
  const categories = useSelector((state) => state.categories);
  const tags = useSelector((state) => state.tags);
  const [form] = Form.useForm();

  const [categoriesDisabled, setCategoriesDisabled] = useState(false);
  const [tagsDisabled, setTagsDisabled] = useState(false);
  const [unlimited, setUnlimited] = useState(false);

  const randomOne = () => {
    let i = Math.floor(Math.random() * flashcards.length);
    let url = `/flashcard/${flashcards[i]._id}`;
    history.push(url);
  };

  return (
    <>
      <Radio.Group optionType="button" className="d-flex">
        <Radio.Button
          className="flex-grow-1 d-flex justify-content-center"
          onClick={showModal}
        >
          Review
        </Radio.Button>
        <Radio.Button onClick={randomOne}>
          <RocketOutlined />
        </Radio.Button>
      </Radio.Group>

      <Modal
        title="Flashcard Review Filter"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="Filter-Form"
          initialValues={{
            categories: [],
            tags: [],
            amount: "",
            priority: false,
          }}
          onFinish={onFormSubmit}
        >
          {/* Categories Selector */}

          <div className="mb-3 d-flex align-items-center">
            <Form.Item
              rules={[{ required: true, message: "required" }]}
              name="categories"
              className="flex-grow-1 me-2 my-0"
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Categories"
                size="large"
                disabled={categoriesDisabled}
              >
                {categories.map((category) => {
                  return <Option key={category}>{category}</Option>;
                })}
              </Select>
            </Form.Item>
            <Checkbox
              onChange={() => {
                if (!categoriesDisabled) {
                  form.setFieldsValue({ categories: ["All Categories"] });
                  setCategoriesDisabled(true);
                } else {
                  form.setFieldsValue({ categories: [] });
                  setCategoriesDisabled(false);
                }
              }}
              checked={categoriesDisabled}
            >
              All
            </Checkbox>
          </div>

          {/* Tags Selector */}

          <div className="my-3 d-flex align-items-center">
            <Form.Item
              rules={[{ required: true, message: "required" }]}
              name="tags"
              className="flex-grow-1 me-2 my-0"
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Tags"
                size="large"
                disabled={tagsDisabled}
              >
                {tags.map((tag) => {
                  return <Option key={tag}>{tag}</Option>;
                })}
              </Select>
            </Form.Item>
            <Checkbox
              onChange={() => {
                if (!tagsDisabled) {
                  form.setFieldsValue({ tags: ["All Tags"] });
                  setTagsDisabled(true);
                } else {
                  form.setFieldsValue({ tags: [] });
                  setTagsDisabled(false);
                }
              }}
              checked={tagsDisabled}
            >
              All
            </Checkbox>
          </div>

          {/* Amount Selector */}

          <div className="my-3 d-flex align-items-center">
            <div className="flex-grow-1 d-flex align-items-center">
              <Form.Item
                rules={[{ required: true, message: "required" }]}
                name="amount"
                className="d-flex flex-grow-1 my-0 pe-2"
              >
                <InputNumber
                  min={1}
                  max={10}
                  placeholder={unlimited ? "Amount: Unlimited" : "Amount"}
                  size="large"
                  style={{ width: "100%" }}
                  parser={(value) => {
                    return value.replace(/^(0+)|[^\d]+/g, "");
                  }}
                  formatter={(value) => {
                    return value.replace(/^(0+)|[^\d]+/g, "");
                  }}
                  disabled={unlimited}
                />
              </Form.Item>
              <Checkbox
                checked={unlimited}
                onChange={() => {
                  if (!unlimited) {
                    form.setFieldsValue({ amount: "unlimited" });
                    setUnlimited(true);
                  } else {
                    setUnlimited(false);
                    form.setFieldsValue({ amount: "" });
                  }
                }}
              >
                ∞
              </Checkbox>
            </div>

            <div className="flex-grow-1 d-flex justify-content-center">
              <Tooltip
                placement="bottomLeft"
                title="Give priority to the flashcards that have been a long time since the last review time"
                arrowPointAtCenter
              >
                <Form.Item name="priority" className="my-0">
                  <PrioritySwitch />
                </Form.Item>
              </Tooltip>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

const PrioritySwitch = ({ value, onChange }) => {
  return (
    <Switch
      checkedChildren="Priority"
      unCheckedChildren="Random"
      checked={value}
      onChange={() => onChange(!value)}
    />
  );
};

export default Filter;
