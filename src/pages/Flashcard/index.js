import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Typography,
  Layout,
  Spin,
  message,
  Tag,
  Collapse,
  Popconfirm,
} from "antd";
import getColor from "../../utilities/getColor";
import MarkdownIt from "markdown-it";
import { LeftOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteFlashcard } from "../../actions";
import "./style.css";

const { Title } = Typography;
const { Content } = Layout;
const { Panel } = Collapse;
const mdParser = new MarkdownIt(/* Markdown-it options */);

const Flashcard = () => {
  const { id } = useParams();
  const history = useHistory();
  const [flashcard, setFlashcard] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        let flashcard = (await axios.get(`/api/flashcards/${id}`)).data;
        setFlashcard(flashcard);
      } catch (error) {
        message.error("Something went wrong!");
      }
    };

    fetchFlashcard();
  }, []);

  if (flashcard === null) {
    return (
      <Content className="d-flex justify-content-center align-items-center">
        <Spin size="large" />
      </Content>
    );
  }

  return (
    <Content style={{ width: "90%", maxWidth: "800px", margin: "50px auto" }}>
      <div className="pb-4 d-flex justify-content-between">
        <div className="d-flex ">
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => history.goBack()}
          />
          <h2 className="ps-2">{flashcard.category}</h2>
        </div>
        <div>
          <Link to={`/edit/${id}`}>
            <Button
              shape="circle"
              icon={<EditOutlined />}
              type="primary"
              className="me-2"
            />
          </Link>

          <Popconfirm
            title="Are you sure to delete this flashcard?"
            onConfirm={() => {
              dispatch(deleteFlashcard(id, history));
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle" icon={<DeleteOutlined />} type="danger" />
          </Popconfirm>
        </div>
      </div>

      <Title level={3}>{flashcard.title}</Title>
      <div className="pb-5">
        {flashcard.tags.map((tag) => {
          return <Tag color={getColor(tag)}>{tag}</Tag>;
        })}
      </div>

      <div className="pb-5">
        <Collapse defaultActiveKey={["question"]}>
          {flashcard.question !== "" && (
            <Panel header="Question" key="question">
              <div
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(flashcard.question),
                }}
              />
            </Panel>
          )}
          {flashcard.hint !== "" && (
            <Panel header="Hint" key="2">
              <div
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(flashcard.hint),
                }}
              />
            </Panel>
          )}
          {flashcard.answer !== "" && (
            <Panel header="Answer" key="3">
              <div
                dangerouslySetInnerHTML={{
                  __html: mdParser.render(flashcard.answer),
                }}
                id="flashcard-content"
              />
            </Panel>
          )}
        </Collapse>
      </div>
    </Content>
  );
};

export default Flashcard;
