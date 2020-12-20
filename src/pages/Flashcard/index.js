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
  Pagination,
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

const Flashcard = (props) => {
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
  }, [id]);

  if (flashcard === null) {
    return (
      <Content className="d-flex justify-content-center align-items-center">
        <Spin size="large" />
      </Content>
    );
  }

  let cardList = props.location.cardList;
  let currentPage = cardList ? cardList.indexOf(id) + 1 : 0;

  return (
    <Content
      style={{ width: "90%", maxWidth: "800px", margin: "50px auto" }}
      className="d-flex flex-column"
    >
      <div>
        <div className="pb-4 d-flex justify-content-between">
          <div className="d-flex ">
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={() => history.push("/")}
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
      </div>

      {cardList && (
        <div className="py-4 flex-grow-1 d-flex align-items-end">
          <div>
            <Pagination
              defaultCurrent={currentPage}
              total={cardList.length}
              defaultPageSize={1}
              responsive={true}
              onChange={(index) => {
                console.log(`/flashcard/${cardList[index - 1]}`);
                history.push({
                  pathname: `/flashcard/${cardList[index - 1]}`,
                  cardList: cardList,
                });
              }}
            />
          </div>
        </div>
      )}
    </Content>
  );
};

export default Flashcard;
