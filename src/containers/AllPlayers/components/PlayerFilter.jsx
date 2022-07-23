import { Modal, Select } from "antd";
import React, { useState } from "react";
import Icon from "supercons";
const { Option } = Select;

const SELECT_TYPES = {
  LEAGUE: "LEAGUE",
  TEAM: "TEAM",
};

const PlayerFilter = ({
  changeLeagueFilter,
  handleChangeFilter,
  allLeagues,
  selectedLeague,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <div className="flex flex-col w-full text-lg gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-bold">
              Name:
            </label>
            <input
              type="text"
              className="px-4 py-2 border-2 outline-none text-sm"
              placeholder="Player Name..."
              name="name"
              onChange={handleChangeFilter}
            />
          </div>

          <SelectElementSection
            type={SELECT_TYPES.LEAGUE}
            elements={allLeagues}
            handleChange={changeLeagueFilter}
          />

          <SelectElementSection
            type={SELECT_TYPES.TEAM}
            elements={selectedLeague ? selectedLeague.teams : []}
          />
        </div>
      </Modal>

      <button
        className="flex items-center px-5 py-2 bg-primary_color text-white font-bold gap-2"
        onClick={showModal}
      >
        <Icon glyph="filter" />
        <p className="mb-0">Filter</p>
      </button>
    </>
  );
};

const SelectElementSection = ({ handleChange, elements, type }) => {
  const label = (type) => {
    if (type === SELECT_TYPES.LEAGUE) return "League:";
    else if (type === SELECT_TYPES.TEAM) return "Team:";
  };

  return (
    <div className="flex flex-col">
      <label className="font-bold">{label(type)}</label>
      <Select
        className="w-full"
        showSearch
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={handleChange}
      >
        {elements.map((el) => (
          <Option value={el._id}>{el.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default PlayerFilter;
