import { useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";

import { Layout, Button, Form, message } from "antd";
import StepsBar from "./StepsBar";
import StepsContent from "./StepsContent";
import InfoInputBox from "./InfoInputBox";
import { createFlashcard, updateFlashcard } from "../../actions";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const { Content } = Layout;

const AddPage = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [initValues, setInitValues] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        let flashcard = (await axios.get(`/api/flashcards/${id}`)).data;
        setInitValues(flashcard);
      } catch (error) {
        message.error("Something went wrong! " + error.toString());
        history.push("/");
      }
    };
    if (id) fetchFlashcard();
    else
      setInitValues({
        title: "",
        category: "",
        tags: [],
        question: "",
        hint: "",
        answer: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    if (!id) dispatch(createFlashcard(values, history));
    else dispatch(updateFlashcard(values, id, history));
  };

  if (!initValues) return <div>loading</div>;

  return (
    <Form
      form={form}
      name="addCard"
      onFinish={onFinish}
      style={{ height: "100%" }}
      initialValues={initValues}
    >
      <Layout style={{ height: "100%", background: "#fff" }}>
        <Content style={{ padding: "0 100px" }} className="d-flex flex-column">
          <div className="py-4">
            <StepsBar
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>

          <div className="my-4">
            <InfoInputBox />
          </div>

          <div className="flex-grow-1">
            <StepsContent currentStep={currentStep} />
          </div>

          <div className="my-4">
            <Button
              type="primary"
              shape="round"
              icon={<CheckOutlined />}
              size="large"
              htmlType="submit"
            >
              {id ? "Update" : "Submit"}
            </Button>
          </div>
        </Content>
      </Layout>
    </Form>
  );
};

export default AddPage;
