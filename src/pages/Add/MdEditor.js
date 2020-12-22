import * as React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Typography } from "antd";
const { Title } = Typography;

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange(html, text, onChange) {
  onChange(text);
}

const Editor = ({ title, placeholder, value, onChange, editorHeight }) => {
  return (
    <div style={{ height: editorHeight }} className="d-flex flex-column">
      <Title level={3}>{title}</Title>
      <div className="flex-grow-1">
        <MdEditor
          style={{ height: "100%" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ html, text }) =>
            handleEditorChange(html, text, onChange)
          }
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Editor;
