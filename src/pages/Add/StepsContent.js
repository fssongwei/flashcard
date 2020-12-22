import MdEditor from "./MdEditor";
import { Form } from "antd";

const StepsContent = ({ currentStep }) => {
  return (
    <>
      <div
        className="editorContainer"
        style={{ display: currentStep === 0 ? "" : "none" }}
      >
        <Form.Item name="question" className="m-0">
          <MdEditor title="Question" placeholder="Enter Your Questions" />
        </Form.Item>
      </div>

      <div style={{ display: currentStep === 1 ? "" : "none" }}>
        <Form.Item name="hint" className="m-0">
          <MdEditor title="Hint" placeholder="Enter Hints" />
        </Form.Item>
      </div>

      <div style={{ display: currentStep === 2 ? "" : "none" }}>
        <Form.Item name="answer" className="m-0">
          <MdEditor title="Answer" placeholder="Enter Your Answer" />
        </Form.Item>
      </div>
    </>
  );
};

export default StepsContent;
