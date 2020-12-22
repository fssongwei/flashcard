import { Radio } from "antd";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";

const ViewModeSwitcher = ({ viewMode, setViewMode }) => {
  return (
    <Radio.Group
      onChange={(e) => setViewMode(e.target.value)}
      value={viewMode}
      optionType="button"
      buttonStyle="solid"
    >
      <Radio.Button value="list">
        <UnorderedListOutlined />
      </Radio.Button>
      <Radio.Button value="card">
        <AppstoreOutlined />
      </Radio.Button>
    </Radio.Group>
  );
};

export default ViewModeSwitcher;
