import { DatePicker } from "antd";
import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { Select } from "antd";
import { playerPositions } from "../../helpers/playerPositions";
import { countryList } from "../../helpers/allCountries";
import ProgressBar from "./components/ProgressBar";
const { Option } = Select;

const CreatePlayer = () => {
  const imageInput = useRef();

  const selectClass = "esm:w-[100%] sm:w-52 md:w-72 lg:w-80 xl:w-96 rounded-md";

  const onChange = (date, dateString) => {};

  return (
    <div className="exsm:px-3 esm:px-7 sm:px-10 md:px-20 lg:px-64">
      <ProgressBar />

      <div className="bg-form_bg py-8 px-16 exsm:px-3 esm:px-5 sm:px-10 md:px-16">
        <h1 className="text-2xl font-monserratBold mb-5 exsm:text-center">
          Player Data
        </h1>
        <form className="w-full space-y-6">
          <div className="flex w-full items-center h-max esm:flex-col">
            <input
              type="file"
              ref={imageInput}
              className="hidden"
              accept=".jpg, .png, .jpeg"
            />
            <div
              className="border-dashed min-w-[150px] min-h-[150px] rounded-full flex justify-center items-center bg-white border-4 cursor-pointer border-primary_color esm:min-w-[100px] esm:min-h-[100px]"
              onClick={() => imageInput.current.click()}
            >
              <FaCamera className="text-3xl text-primary_color esm:text-xl" />
            </div>

            <div className="flex flex-col ml-16 space-y-3 w-full esm:ml-0 exsm:mt-5">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="text-base font-bold w-full mb-1">
                  First Name
                </label>
                <input type="text" className="px-3 py-2 rounded-md" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="text-base font-bold w-full mb-1">
                  Last Name
                </label>
                <input type="text" className="px-3 py-2 rounded-md" />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between esm:flex-col esm:space-y-5">
            <div className="flex flex-col">
              <label htmlFor="" className="text-base font-bold w-full mb-1">
                Birthdate
              </label>
              <DatePicker
                onChange={onChange}
                picker={"date"}
                size="large"
                className={selectClass}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="text-base font-bold w-full mb-1">
                Position
              </label>
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                className={selectClass}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
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
              <label htmlFor="" className="text-base font-bold w-full mb-1">
                Gender
              </label>
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                className={selectClass}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value={"MALE"}>Male</Option>
                <Option value={"FEMALE"}>Female</Option>
              </Select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="text-base font-bold w-full mb-1">
                Country
              </label>
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                className={selectClass}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
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
            <button className="font-bold  py-3 px-8 text-lg bg-primary_color text-white">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlayer;
