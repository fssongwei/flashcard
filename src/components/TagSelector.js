import { useState } from "react";
import { TreeSelect } from "antd";

const { TreeNode } = TreeSelect;

const TagSelector = ({ tag, setTag }) => {
  //   const [value, setValue] = useState(value);

  const onChange = (value) => {
    setTag(value);
  };

  let obj = {
    HTML: null,
    CSS: null,
    Javascript: {
      变量: null,
      函数: null,
      DOM: null,
    },
  };

  const generateTree = (obj, path) => {
    if (!obj) return [];
    let tree = [];
    for (let prop of Object.keys(obj)) {
      let children = generateTree(obj[prop], path + "." + prop);
      let node = (
        <TreeNode
          value={path + "." + prop}
          title={prop}
          key={path + "." + prop}
        >
          {children};
        </TreeNode>
      );
      tree.push(node);
    }
    return tree;
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: "100%" }}
      value={tag}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Tag"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      size="large"
    >
      {generateTree(obj, "")}
    </TreeSelect>
  );
};

export default TagSelector;
