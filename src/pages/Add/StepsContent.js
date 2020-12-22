import { useState, useCallback } from "react";
import MdEditor from "./MdEditor";
import { Form } from "antd";

const StepsContent = ({ currentStep }) => {
  const [editorHeight, setEditorHeight] = useState("100px");
  const editorContainerRef = useCallback((node) => {
    if (node !== null) {
      setEditorHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div style={{ height: "100%" }} ref={editorContainerRef}>
      <div style={{ display: currentStep === 0 ? "" : "none" }}>
        <Form.Item name="question" className="m-0">
          <MdEditor
            title="Question"
            placeholder="Enter Your Questions"
            editorHeight={editorHeight}
          />
        </Form.Item>
      </div>

      <div style={{ display: currentStep === 1 ? "" : "none" }}>
        <Form.Item name="hint" className="m-0">
          <MdEditor
            title="Hint"
            placeholder="Enter Hints"
            editorHeight={editorHeight}
          />
        </Form.Item>
      </div>

      <div style={{ display: currentStep === 2 ? "" : "none" }}>
        <Form.Item name="answer" className="m-0">
          <MdEditor
            title="Answer"
            placeholder="Enter Your Answer"
            editorHeight={editorHeight}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default StepsContent;
