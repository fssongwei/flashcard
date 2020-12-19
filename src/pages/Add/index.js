import { useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";

import { Layout, Button, message } from "antd";
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

  const [questionText, setQuestionText] = useState("");
  const [hintText, setHintText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState(null);
  let history = useHistory();

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        let flashcard = (await axios.get(`/api/flashcards/${id}`)).data;
        setQuestionText(flashcard.question);
        setHintText(flashcard.hint);
        setAnswerText(flashcard.answer);
        setTitle(flashcard.title);
        setTags(flashcard.tags);
        setCategory(flashcard.category);
      } catch (error) {
        message.error("Something went wrong!");
        history.push("/");
      }
    };

    if (id) fetchFlashcard();
  }, []);

  const dispatch = useDispatch();
  const onSubmit = (newOrUpdate) => {
    let flashcard = {
      title: title,
      category: category,
      tags: tags,
      question: questionText,
      hint: hintText,
      answer: answerText,
    };
    if (newOrUpdate === "new") dispatch(createFlashcard(flashcard, history));
    if (newOrUpdate === "update")
      dispatch(updateFlashcard(flashcard, id, history));
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
          {!id && (
            <Button
              type="primary"
              shape="round"
              icon={<CheckOutlined />}
              size="large"
              onClick={() => onSubmit("new")}
            >
              Done
            </Button>
          )}

          {id && (
            <Button
              type="primary"
              shape="round"
              icon={<CheckOutlined />}
              size="large"
              onClick={() => onSubmit("update")}
            >
              Update
            </Button>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default AddPage;
