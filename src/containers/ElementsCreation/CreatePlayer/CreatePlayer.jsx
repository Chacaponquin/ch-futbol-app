import { DatePicker } from "antd";
import React, { useRef } from "react";
import Icon from "supercons";
import { Select } from "antd";
import LoaderContainer from "../../../shared/components/LoaderContainer/LoaderContainer";
import { useCreatePlayer } from "./hooks/useCreatePlayer";
import { inputClass, labelClass, selectClass } from "./helpers/classes";

const { Option } = Select;

const CreatePlayer = () => {
  const {
    loading,
    imageLoader,

    countryList,
    showImage,
    playerPositions,

    handleSubmit,

    onImageChange,
    onChangeName,
    onDateChange,
    onGenderChange,
    onPosChange,
    onCountryChange,
  } = useCreatePlayer();

  if (loading || imageLoader) {
    return (
      <div className="fixed w-screen h-screen bg-slate-200/50 top-0 left-0 flex justify-center items-center z-50">
        <LoaderContainer
          className={"w-[200px]"}
          loading={loading || imageLoader}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="exsm:px-3 esm:px-7 sm:px-10 md:px-20 lg:px-64">
        <div className="bg-form_bg py-8 px-16 exsm:px-3 esm:px-5 sm:px-10 md:px-16">
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="flex w-full items-center h-max esm:flex-col">
              <ImageInput onImageChange={onImageChange} showImage={showImage} />

              <div className="flex flex-col ml-16 space-y-3 w-full esm:ml-0 exsm:mt-5">
                <div className="flex flex-col w-full">
                  <label htmlFor="" className={labelClass}>
                    First Name:
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    name="firstName"
                    onChange={onChangeName}
                    placeholder="First Name..."
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="" className={labelClass}>
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    name="lastName"
                    onChange={onChangeName}
                    placeholder="Last Name..."
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between esm:flex-col esm:space-y-5">
              <div className="flex flex-col">
                <label htmlFor="" className={labelClass}>
                  Birthdate:
                </label>
                <DatePicker
                  onChange={onDateChange}
                  picker={"date"}
                  size="large"
                  className={selectClass}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className={labelClass}>
                  Position:
                </label>
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  className={selectClass}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={onPosChange}
                >
                  {playerPositions.map((pos, i) => (
                    <Option value={pos} key={i}>
                      {pos}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="w-full flex justify-between esm:flex-col esm:space-y-5">
              <div className="flex flex-col">
                <label htmlFor="" className={labelClass}>
                  Gender:
                </label>
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  className={selectClass}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={onGenderChange}
                >
                  <Option value={"MALE"}>Male</Option>
                  <Option value={"FEMALE"}>Female</Option>
                </Select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className={labelClass}>
                  Country:
                </label>
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  className={selectClass}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={onCountryChange}
                >
                  {countryList.map((country, i) => (
                    <Option value={country} key={i}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="font-bold  py-2 px-8 text-lg bg-primary_color text-white rounded-md">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ImageInput = ({ onImageChange, showImage }) => {
  const imageInput = useRef();

  return (
    <>
      <input
        type="file"
        ref={imageInput}
        onChange={onImageChange}
        className="hidden"
        multiple={false}
        accept=".jpg, .png, .jpeg"
      />
      {showImage ? (
        <img
          src={showImage}
          alt=""
          className="border-dashed w-[250px] h-[250px] rounded-md flex justify-center items-center bg-white border-4 cursor-pointer border-gray-300 esm:w-[300px] esm:h-[200px] esm:mb-2 object-cover"
          onClick={() => imageInput.current.click()}
        />
      ) : (
        <>
          <div
            className="border-dashed min-w-[250px] min-h-[250px] rounded-md flex justify-center items-center bg-white border-4 cursor-pointer border-gray-300 esm:min-w-[100px] esm:min-h-[100px]"
            onClick={() => imageInput.current.click()}
          >
            <div className="text-gray-600">
              <Icon glyph="cloud-upload" size={60} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePlayer;
