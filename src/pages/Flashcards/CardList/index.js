import { useState } from "react";
import useCards from "./hooks/useCards";
import useSelect from "./hooks/useSelect";

import { Layout, List } from "antd";
import ViewModeSwitcher from "./ViewModeSwitcher";
import TagFilter from "./TagFilter";
import CardBox from "./CardBox";
const { Content } = Layout;

const CardList = ({ category }) => {
  const [viewMode, setViewMode] = useState("card");
  const [flashcards, tags] = useCards(category);
  const [selectedFlashcards, selectedTags, setSelectedTags] = useSelect(
    flashcards
  );
  const title = category || "All Cards";
  const gridPattern =
    viewMode === "list"
      ? { gutter: 16, column: 1 }
      : { gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 };

  return (
    <Content className="p-md-5 mt-md-2 p-4 mt-5">
      <div className="d-flex justify-content-between">
        <h1>{title}</h1>
        <ViewModeSwitcher viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <div className="my-4">
        <TagFilter
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>

      <div className="my-4">
        <List
          grid={gridPattern}
          itemLayout="horizontal"
          dataSource={selectedFlashcards}
          renderItem={(flashcard) => {
            return (
              <List.Item>
                <CardBox
                  flashcard={flashcard}
                  selectedFlashcards={selectedFlashcards}
                />
              </List.Item>
            );
          }}
        />
      </div>
    </Content>
  );
};

export default CardList;
