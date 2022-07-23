import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { fetchAllPlayers } from "../../graphql/Players/fetchAllPlayers";
import { showError, showSucces } from "../../helpers/showNotifications";
import Table from "./components/Table";
import { deletePlayer } from "../../graphql/Players/deletePlayer";
import HeaderSection from "./components/HeaderSection";
import { getAllLeagues } from "../../graphql/Leagues/getAllLeagues";

const AllPlayers = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectPlayers, setSelectPlayers] = useState([]);

  const [allLeagues, setAllLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);

  const [playerFilter, setPlayerFilter] = useState({
    league: null,
    name: null,
  });

  const fetchAllPlayersOptions = () => {
    return {
      variables: { playerFilter },
      onCompleted: ({ fetchAllPlayers }) => {
        setSelectPlayers([]);
        setAllPlayers(fetchAllPlayers);
      },
      onError: showError,
    };
  };

  useQuery(fetchAllPlayers, fetchAllPlayersOptions());

  useQuery(getAllLeagues, {
    onCompleted: ({ getAllLeagues }) => setAllLeagues(getAllLeagues),
  });

  const [deletePlayers, { loading: deleteLoading }] = useMutation(deletePlayer);

  const handlePushSelectPlayer = (e) => {
    if (e.target.checked) {
      setSelectPlayers([...selectPlayers, e.target.id]);
    } else {
      setSelectPlayers(selectPlayers.filter((el) => el !== e.target.id));
    }
  };

  const handleDeletePlayers = () => {
    deletePlayers({
      variables: { players: selectPlayers },
      onCompleted: () => {
        setSelectPlayers([]);
        showSucces({
          header: "Exito",
          description: "Se han eliminado los jugadores con exito",
        });
      },
      onError: showError,
      refetchQueries: [{ query: fetchAllPlayers, ...fetchAllPlayersOptions() }],
    });
  };

  const handleChangeFilter = (e) => {
    setPlayerFilter({
      ...playerFilter,
      [e.target.name]: e.target.value === "" ? null : e.target.value,
    });
  };

  const changeLeagueFilter = (value) => {
    setPlayerFilter({ ...playerFilter, league: value });

    setSelectedLeague(allLeagues.find((el) => el._id === value));
  };

  return (
    <div className="w-full exsm:px-3 esm:px-5 sm:px-7 md:px-16 lg:px-32">
      <div className="border-2 py-5 px-10 esm:px-5">
        <HeaderSection
          handleDeletePlayers={handleDeletePlayers}
          cantSelectPlayers={selectPlayers.length}
          deleteLoading={deleteLoading}
          changeLeagueFilter={changeLeagueFilter}
          handleChangeFilter={handleChangeFilter}
          allLeagues={allLeagues}
          selectedLeague={selectedLeague}
        />
        <Table players={allPlayers} handleChange={handlePushSelectPlayer} />
      </div>
    </div>
  );
};

export default AllPlayers;
