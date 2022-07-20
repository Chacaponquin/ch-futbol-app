import { useContext, useState } from "react";
import { fetchFreePlayers } from "../../../graphql";
import clsx from "clsx";
import { useQuery, useMutation } from "@apollo/client";
import { showError, showSucces } from "../../../helpers/showNotifications";
import { createOffert } from "../../../graphql/Offerts/createOffert";
import UserContext from "../../../context/UserContext";
import { useNavigate } from "react-router";

export const usePlayersHook = (teamID) => {
  const { actualUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [playerSelect, setPlayerSelect] = useState(null);
  const [freePlayers, setFreePlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const { loading: freePlayersLoading } = useQuery(fetchFreePlayers, {
    onError: showError,
    onCompleted: ({ findFreePlayers }) => setFreePlayers(findFreePlayers),
  });

  const [createPlayerOffert, { loading: createOffertLoading }] =
    useMutation(createOffert);

  const handleTransferPlayer = () => {
    if (playerSelect) {
      setSelectedPlayers([...selectedPlayers, playerSelect]);

      const filt = freePlayers.filter((el) => el !== playerSelect);
      setFreePlayers(filt);
    }
  };

  const handleSelectPlayer = (player) => {
    setPlayerSelect(player);
  };

  const handleSubmit = () => {
    createPlayerOffert({
      variables: {
        offert: {
          salary: 0,
          owner: actualUser._id,
          team: teamID,
          to: selectedPlayers.map((el) => el._id),
          type: "PLAYER",
        },
      },
      onError: showError,
      onCompleted: () => {
        showSucces({ header: "Éxito", description: "Equipo creado con éxito" });
        navigate("/dashboard");
      },
    });
  };

  const playerSelectClass = (id) => {
    return clsx(
      "flex items-center py-3 px-4 rounded-md cursor-pointer ",
      playerSelect && playerSelect._id === id
        ? "bg-primary_color text-white"
        : ""
    );
  };

  return {
    handleSelectPlayer,
    handleSubmit,
    createOffertLoading,
    handleTransferPlayer,
    playerSelectClass,
    setFreePlayers,
    setSelectedPlayers,
    freePlayers,
    selectedPlayers,
    playerSelect,
    freePlayersLoading,
  };
};
