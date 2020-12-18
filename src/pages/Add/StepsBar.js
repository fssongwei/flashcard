import { Steps } from "antd";
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

export default StepsBar;
