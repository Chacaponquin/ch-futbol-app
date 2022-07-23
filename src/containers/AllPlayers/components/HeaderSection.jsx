import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../../shared/Loader/Loader";
import clsx from "clsx";
import Icon from "supercons";
import PlayerFilter from "./PlayerFilter";

const HeaderSection = ({
  deleteLoading,
  cantSelectPlayers,
  handleDeletePlayers,
  changeLeagueFilter,
  handleChangeFilter,
  allLeagues,
  selectedLeague,
}) => {
  const buttonClass =
    "py-2 flex items-center gap-2 px-7 text-white trasnsition-all duration-300 font-bold esm:px-4";

  const deleteButtonClass = clsx(buttonClass, "bg-danger_color", {
    "!bg-slate-200 !text-black": !cantSelectPlayers,
  });

  return (
    <div className="w-full py-6 flex justify-between text-base items-center esm:flex-col esm:space-y-3 sm:flex-col sm:space-y-3 md:flex-row md:space-y-0">
      <PlayerFilter
        changeLeagueFilter={changeLeagueFilter}
        handleChangeFilter={handleChangeFilter}
        allLeagues={allLeagues}
        selectedLeague={selectedLeague}
      />

      <div className="flex space-x-4 items-center esm:text-sm">
        {deleteLoading ? (
          <Loader className="text-sm h-[70px] px-6" />
        ) : (
          <button
            className={deleteButtonClass}
            disabled={!cantSelectPlayers}
            onClick={handleDeletePlayers}
          >
            <Icon glyph="delete" />
            <p className="mb-0">Delete</p>
          </button>
        )}

        <Link to={"/createPlayer"}>
          <button className={clsx(buttonClass, "bg-primary_color")}>
            <Icon glyph="plus" />
            <p className="mb-0">Add Player</p>
          </button>
        </Link>

        <a href={`${process.env.REACT_APP_API_CURRENT}/getAllPlayersCSV`}>
          <button className={clsx(buttonClass, "bg-primary_color")}>
            <Icon glyph="docs" />
            <p className="mb-0">Get CSV</p>
          </button>
        </a>
      </div>
    </div>
  );
};

export default HeaderSection;
