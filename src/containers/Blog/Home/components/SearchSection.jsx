import React from "react";
import { Select } from "antd";
const { Option } = Select;

const SearchSection = () => {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <Select
        showSearch
        className="w-[400px]"
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
      >
        <Option value="1">Not Identified</Option>
        <Option value="2">Closed</Option>
        <Option value="3">Communicated</Option>
        <Option value="4">Identified</Option>
        <Option value="5">Resolved</Option>
        <Option value="6">Cancelled</Option>
      </Select>
    </div>
  );
};

export default SearchSection;
