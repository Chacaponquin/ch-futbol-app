import { AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import PlayerRow from "./PlayerRow";

const Table = ({ players, handleChange }) => {
  const tableHeader = [
    "Player",
    "Country",
    "Gender",
    "Position",
    "Age",
    "Price",
    "Team",
    "",
  ];

  return (
    <AnimateSharedLayout>
      <motion.table className="w-full rounded-lg columns-8">
        <thead className="rounded-lg">
          <tr className="bg-slate-100">
            {tableHeader.map((header, i) => (
              <th key={i} className="text-left text-lg py-5 first:pl-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {players.map((player, i) => (
            <PlayerRow {...player} key={i} handleChange={handleChange} />
          ))}
        </tbody>
      </motion.table>
    </AnimateSharedLayout>
  );
};

export default Table;
