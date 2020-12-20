import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { List, Layout, Select, Tag, Card, Radio } from "antd";
import getColor from "../../utilities/getColor";
import { Link } from "react-router-dom";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

const TagFilter = ({ allTags, selectedTags, setSelectedTags }) => {
  const handleChange = (selectedTags) => {
    setSelectedTags(selectedTags);
  };

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      placeholder="Tag Filter: All"
      onChange={handleChange}
      size="large"
      value={selectedTags}
    >
      {allTags.map((tag) => {
        return <Option key={tag}>{tag}</Option>;
      })}
    </Select>
  );
};

const CardList = ({ category }) => {
  const [viewMode, setViewMode] = useState("card");
  const allFlashcards = useSelector((state) => state.flashcards);
  const [selectedTags, setSelectedTags] = useState([]);

  let flashcards = []; // flashcards under the category
  let tags = new Set(); // tags of the flashcards under the category
  let selectedFlashcards = []; // flashcards that will be display based on filter

  for (let flashcard of allFlashcards) {
    if (flashcard.category === category || !category) {
      flashcards.push(flashcard);
      for (let tag of flashcard.tags) {
        tags.add(tag);
      }
    }
  }

  const isFlashcardSelected = (flashcard, selectedTags) => {
    for (let tag of flashcard.tags) {
      for (let selectedTag of selectedTags) {
        if (selectedTag === tag) return true;
      }
    }
    return false;
  };

  if (selectedTags.length === 0) {
    selectedFlashcards = flashcards;
  } else {
    let newSelectedFlashcards = [];
    for (let flashcard of flashcards) {
      if (isFlashcardSelected(flashcard, selectedTags)) {
        newSelectedFlashcards.push(flashcard);
      }
    }
    selectedFlashcards = newSelectedFlashcards;
  }

  return (
    <Content
      //style={{ padding: "50px 100px" }}
      className="p-md-5 mx-md-5 mt-md-2 p-4 mt-5"
    >
      <div className="d-flex justify-content-between">
        <h1>{category || "All Cards"}</h1>

        <Radio.Group
          // options={["list", "card"]}
          onChange={(e) => setViewMode(e.target.value)}
          value={viewMode}
          optionType="button"
          buttonStyle="solid"
        >
          <Radio.Button value="list">
            <UnorderedListOutlined />
          </Radio.Button>
          .
          <Radio.Button value="card">
            <AppstoreOutlined />
          </Radio.Button>
          .
        </Radio.Group>
      </div>

      <div className="py-4">
        <TagFilter
          allTags={Array.from(tags)}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>

      <List
        grid={
          viewMode === "list"
            ? ""
            : { gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }
        }
        itemLayout="horizontal"
        dataSource={selectedFlashcards}
        renderItem={(flashcard) => {
          if (viewMode === "list") {
            return (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link
                      to={{
                        pathname: `/flashcard/${flashcard._id}`,
                        cardList: selectedFlashcards.map((card) => card._id),
                      }}
                    >
                      {flashcard.title}
                    </Link>
                  }
                  description={flashcard.question || "(no description)"}
                />

                {flashcard.tags.map((tag) => {
                  return (
                    <Tag color={getColor(tag)} key={tag}>
                      {tag}
                    </Tag>
                  );
                })}
              </List.Item>
            );
          } else {
            return (
              <List.Item>
                <Link
                  to={{
                    pathname: `/flashcard/${flashcard._id}`,
                    cardList: selectedFlashcards.map((card) => card._id),
                  }}
                >
                  <Card hoverable>
                    <Card.Meta
                      title={flashcard.title}
                      description={flashcard.question || "(no description)"}
                    />

                    <div className="pt-3">
                      {flashcard.tags.map((tag) => {
                        return (
                          <Tag color={getColor(tag)} key={tag}>
                            {tag}
                          </Tag>
                        );
                      })}
                    </div>
                  </Card>
                </Link>
              </List.Item>
            );
          }
        }}
      />
    </Content>
  );
};

export default CardList;
