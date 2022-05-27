import { useState } from "react";
import {
  fetchFreePlayers,
  fetchOwnPlayers,
  transferPlayer,
} from "../../../graphql";
import clsx from "clsx";
import { useLazyQuery, useMutation } from "@apollo/client";
import { showError } from "../../../helpers/showNotifications";

export const usePlayersHook = (teamID) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerSectionOpen, setPlayerSectionOpen] = useState(false);
  const [freePlayers, setFreePlayers] = useState([]);
  const [ownPlayers, setOwnPlayers] = useState([]);

  const [getFreePlayers, { loading: freePlayersLoading }] = useLazyQuery(
    fetchFreePlayers,
    {
      onError: showError,
      onCompleted: (data) => setFreePlayers(data.findFreePlayers),
    }
  );

  const [getOwnPlayers, { loading: ownPlayersLoading }] = useLazyQuery(
    fetchOwnPlayers,
    {
      variables: { team: { teamID } },
      onError: showError,
      onCompleted: (data) => setOwnPlayers(data.fetchOwnPlayers),
    }
  );

  const [changePlayer, { loading: changePlayerLoading }] = useMutation(
    transferPlayer,
    {
      variables: {
        data: { teamTo: teamID, player: selectedPlayer },
      },
      onError: showError,
      refetchQueries: [
        { query: fetchFreePlayers },
        { query: fetchOwnPlayers, variables: { team: { teamID } } },
      ],
    }
  );

  const handleOpenPlayersSection = () => {
    if (!playerSectionOpen) {
      getOwnPlayers();
      getFreePlayers();
    }

    setPlayerSectionOpen(!playerSectionOpen);
  };

  const handleTransferPlayer = () => {
    changePlayer();
  };

  const handleSelectPlayer = (id) => {
    setSelectedPlayer(id);
  };

  const playerSelectClass = (id) => {
    return clsx(
      "flex items-center p-4 rounded-xl cursor-pointer",
      selectedPlayer === id ? "bg-primary_color text-white" : ""
    );
  };

  return {
    handleSelectPlayer,
    handleOpenPlayersSection,
    handleTransferPlayer,
    playerSelectClass,
    setFreePlayers,
    setOwnPlayers,

    playerSectionOpen,
    freePlayers,
    ownPlayers,
    selectedPlayer,

    ownPlayersLoading,
    changePlayerLoading,
    freePlayersLoading,
  };
};
