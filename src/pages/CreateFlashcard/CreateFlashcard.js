import { useState } from "react";
import MdEditor from "../../components/MdEditor";
import TagSelector from "../../components/TagSelector";
import { CheckOutlined } from "@ant-design/icons";

import { Layout, Typography, Steps, Button } from "antd";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Step } = Steps;

const StepsBar = ({ currentStep, setCurrentStep }) => {
  const onStepChange = (currentStep) => {
    setCurrentStep(currentStep);
  };

  return (
    <Steps
      type="navigation"
      size="small"
      current={currentStep}
      onChange={onStepChange}
      className="site-navigation-steps"
    >
      <Step status={currentStep === 0 ? "process" : "wait"} title="Question" />
      <Step status={currentStep === 1 ? "process" : "wait"} title="Hint" />
      <Step status={currentStep === 2 ? "process" : "wait"} title="Answer" />
    </Steps>
  );
};

const Tab = ({ title, placeholder, value, setValue, height }) => {
  return (
    <>
      <Title level={3} className="pb-2">
        {title}
      </Title>
      <MdEditor
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        height="60vh"
      />
    </>
  );
};

const CreateFlashcard = () => {
  const [questionText, setQuestionText] = useState("");
  const [hintText, setHintText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Layout style={{ height: "100vh", background: "#fff" }}>
      <Content className="px-6">
        <div className="m-4 py-2">
          <StepsBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>

        <div className="m-4 py-2" style={{ display: "flex" }}>
          <Title level={3} className="pb-2 pr-4">
            Tag
          </Title>
          <div style={{ flex: 1 }}>
            <TagSelector />
          </div>
        </div>

        <div className="m-4 pb-2">
          {currentStep === 0 && (
            <Tab
              title="Question"
              placeholder="Enter Your Questions"
              value={questionText}
              setValue={setQuestionText}
            />
          )}

          {currentStep === 1 && (
            <Tab
              title="Hint"
              placeholder="Enter Hints"
              value={hintText}
              setValue={setHintText}
            />
          )}

          {currentStep === 2 && (
            <Tab
              title="Answer"
              placeholder="Enter Your Answer"
              value={answerText}
              setValue={setAnswerText}
            />
          )}
        </div>

        <div className="m-4 py-2">
          <Button
            type="primary"
            shape="round"
            icon={<CheckOutlined />}
            size="large"
          >
            Done
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateFlashcard;
