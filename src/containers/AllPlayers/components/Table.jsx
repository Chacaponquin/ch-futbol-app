import { AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import PlayerRow from "./PlayerRow";
import clsx from "clsx";

const Table = ({ players, handleChange }) => {
  const columnClass = "text-left text-lg py-5 esm:text-base";

  const tableHeader = [
    {
      column: "Player",
      class: clsx(columnClass, "pl-6 esm:pl-2 esm:text-center"),
    },
    {
      column: "Country",
      class: clsx(columnClass, "esm:hidden sm:hidden md:table-cell"),
    },
    {
      column: "Gender",
      class: clsx(columnClass, "esm:hidden sm:hidden xl:table-cell"),
    },
    {
      column: "Position",
      class: clsx(columnClass, "esm:hidden sm:hidden xl:table-cell"),
    },
    { column: "Age", class: clsx(columnClass, "esm:hidden sm:table-cell") },
    {
      column: "Price",
      class: clsx(columnClass, "esm:hidden sm:hidden xl:table-cell"),
    },
    {
      column: "Team",
      class: clsx(columnClass, "esm:hidden sm:hidden lg:table-cell"),
    },
    { column: "", class: columnClass },
  ];

  return (
    <AnimateSharedLayout>
      <motion.table className="w-full rounded-lg columns-8">
        <thead className="rounded-lg">
          <tr className="bg-slate-100">
            {tableHeader.map((header, i) => (
              <th key={i} className={header.class}>
                {header.column}
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
