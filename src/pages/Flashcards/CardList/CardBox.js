import { Tag, Card } from "antd";
import { Link } from "react-router-dom";
import getColor from "../../../utilities/getColor";

const CardBox = ({ flashcard, selectedFlashcards }) => {
  let title = flashcard.title;
  let description =
    flashcard.question.replace(/[\r\n]/g, "") || "(no description)";
  let tags = flashcard.tags.map((tag) => {
    return (
      <Tag color={getColor(tag)} key={tag} className="my-1">
        {tag}
      </Tag>
    );
  });

  return (
    <Link
      to={{
        pathname: `/flashcard/${flashcard._id}`,
        cardList: selectedFlashcards.map((card) => card._id),
      }}
    >
      <Card hoverable>
        <Card.Meta
          title={title}
          description={
            <div
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {description}
            </div>
          }
        />

        <div className="pt-3">{tags}</div>
      </Card>
    </Link>
  );
};

export default CardBox;
