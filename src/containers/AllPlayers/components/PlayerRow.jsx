import { Checkbox } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { BsBarChart } from "react-icons/bs";
import React, { useState } from "react";
import SeasonChart from "./SeasonChart";
import TotalStats from "./TotalStats";

const PlayerRow = ({
  _id,
  image,
  fullName,
  country,
  gender,
  position,
  age,
  actualTeamInf,
  actualPrice,
  seasonRecords,
  totalStats,
  handleChange,
}) => {
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <>
      <motion.tr className="font-bold text-sm " layout>
        <td className="flex py-5 items-center pl-6 space-x-5 esm:pl-2 esm:space-x-2">
          <Checkbox className="" onChange={handleChange} id={_id} />
          <img
            src={image}
            alt={fullName}
            className="rounded-full w-[50px] h-[50px] esm:w-[30px] esm:h-[30px]"
          />
          <p className="mb-0">{fullName}</p>
        </td>
        <td className="esm:hidden sm:hidden md:table-cell">{country}</td>
        <td className="esm:hidden sm:hidden xl:table-cell">{gender}</td>
        <td className="esm:hidden sm:hidden xl:table-cell">{position}</td>
        <td className="esm:hidden">{age}</td>
        <td className="esm:hidden sm:hidden xl:table-cell">${actualPrice}</td>

        {actualTeamInf ? (
          <td className="esm:hidden sm:hidden lg:table-cell">
            <div className="flex items-center">
              <img
                src={actualTeamInf?.image}
                alt={actualTeamInf?.name}
                className="rounded-full mr-4 w-[50px] h-[50px]"
              />
              <p className="mb-0">{actualTeamInf?.name}</p>
            </div>
          </td>
        ) : (
          <td className="esm:hidden sm:hidden lg:table-cell">
            <div className="flex justify-center pr-4">
              <button className="px-5 py-2 rounded-full bg-success_color text-white cursor-text font-bold w-full">
                Free
              </button>
            </div>
          </td>
        )}
        <td
          className="text-xl pr-6 cursor-pointer chart esm:pr-2"
          onClick={() => setStatsOpen(!statsOpen)}
        >
          <BsBarChart />
        </td>
      </motion.tr>

      <AnimatePresence>
        {statsOpen && (
          <motion.tr
            className="col-span-12"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transitionDuration: "500ms",
            }}
            exit={{ opacity: 0, height: "0px", transitionDuration: "400ms" }}
            layout
          >
            <td colSpan={8}>
              <div className="flex flex-col items-center w-full">
                <TotalStats {...totalStats} />
                <SeasonChart seasonRecords={seasonRecords} />
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlayerRow;
