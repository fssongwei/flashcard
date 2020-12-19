import MdEditor from "./MdEditor";
import { Typography } from "antd";
const { Title } = Typography;

const ConfiguredEditor = ({ title, placeholder, value, setValue }) => {
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

const StepsContent = ({
  currentStep,
  questionText,
  setQuestionText,
  hintText,
  setHintText,
  answerText,
  setAnswerText,
}) => {
  if (currentStep === 0) {
    return (
      <ConfiguredEditor
        title="Question"
        placeholder="Enter Your Questions"
        value={questionText}
        setValue={setQuestionText}
      />
    );
  }

  if (currentStep === 1) {
    return (
      <ConfiguredEditor
        title="Hint"
        placeholder="Enter Hints"
        value={hintText}
        setValue={setHintText}
      />
    );
  }

  if (currentStep === 2) {
    return (
      <ConfiguredEditor
        title="Answer"
        placeholder="Enter Your Answer"
        value={answerText}
        setValue={setAnswerText}
      />
    );
  }
};

export default StepsContent;
