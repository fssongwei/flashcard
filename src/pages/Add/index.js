import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";

import { Layout, Button } from "antd";
import StepsBar from "./StepsBar";
import StepsContent from "./StepsContent";
import InfoInputBox from "./InfoInputBox";
import { createFlashcard } from "../../actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { Content } = Layout;

const AddPage = () => {
  const [questionText, setQuestionText] = useState("");
  const [hintText, setHintText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState(null);
  let history = useHistory();

  const dispatch = useDispatch();
  const onSubmit = () => {
    let flashcard = {
      title: title,
      category: category,
      tags: tags,
      question: questionText,
      hint: hintText,
      answer: answerText,
    };
    dispatch(createFlashcard(flashcard, history));
    console.log(flashcard);
  };

  return (
    <Layout style={{ height: "100vh", background: "#fff" }}>
      <Content style={{ padding: "0 100px" }}>
        <div className="py-4">
          <StepsBar
            className="py-4"
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        <div className="py-4">
          <InfoInputBox
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="py-4">
          <StepsContent
            currentStep={currentStep}
            questionText={questionText}
            setQuestionText={setQuestionText}
            hintText={hintText}
            setHintText={setHintText}
            answerText={answerText}
            setAnswerText={setAnswerText}
          />
        </div>

        <div className="py-4">
          <Button
            type="primary"
            shape="round"
            icon={<CheckOutlined />}
            size="large"
            onClick={onSubmit}
          >
            Done
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default AddPage;
