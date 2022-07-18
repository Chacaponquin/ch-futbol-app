import { useState } from "react";
import {
  fetchFreePlayers,
  fetchOwnPlayers,
  transferPlayer,
} from "../../../graphql";
import clsx from "clsx";
import { useQuery, useMutation } from "@apollo/client";
import { showError } from "../../../helpers/showNotifications";

export const usePlayersHook = (teamID) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [freePlayers, setFreePlayers] = useState([]);
  const [ownPlayers, setOwnPlayers] = useState([]);

  const { loading: freePlayersLoading } = useQuery(fetchFreePlayers, {
    onError: showError,
    onCompleted: ({ findFreePlayers }) => setFreePlayers(findFreePlayers),
  });

  const { loading: ownPlayersLoading } = useQuery(fetchOwnPlayers, {
    variables: { team: { teamID } },
    onError: showError,
    onCompleted: ({ fetchOwnPlayers }) => {
      setOwnPlayers(fetchOwnPlayers);
    },
  });

  const [changePlayer, { loading: changePlayerLoading }] = useMutation(
    transferPlayer,
    {
      variables: {
        data: { teamTo: teamID, player: selectedPlayer },
      },
      onError: showError,
      refetchQueries: [
        { query: fetchFreePlayers },
        {
          query: fetchOwnPlayers,
          variables: { team: { teamID } },
        },
      ],
    }
  );

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

    handleTransferPlayer,
    playerSelectClass,
    setFreePlayers,
    setOwnPlayers,

    freePlayers,
    ownPlayers,
    selectedPlayer,

    ownPlayersLoading,
    changePlayerLoading,
    freePlayersLoading,
  };
};
