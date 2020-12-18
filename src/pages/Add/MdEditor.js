import * as React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange(html, text, setValue) {
  //   console.log("handleEditorChange", html, text);
  setValue(text);
}

const Editor = ({ value, setValue, placeholder, height }) => {
  return (
    <MdEditor
      style={{ height: height || "50vh" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={({ html, text }) => handleEditorChange(html, text, setValue)}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Editor;
