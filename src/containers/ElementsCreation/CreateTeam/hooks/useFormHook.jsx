import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

import { findAvailableLeagues, createTeamMutation } from "../../../../graphql";
import { showError } from "../../../../helpers/showNotifications";

export const useFormHook = (setTeamID, changeNextSection) => {
  const [freeLeagues, setFreeLeagues] = useState([]);

  const [teamInf, setTeamInf] = useState({
    name: null,
    league: null,
  });

  useQuery(findAvailableLeagues, {
    onError: showError,
    onCompleted: ({ findAvailibleLeagues }) =>
      setFreeLeagues(findAvailibleLeagues),
  });

  const [newTeam, { loading: createTeamLoading }] =
    useMutation(createTeamMutation);

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      if (!teamInf.league) {
        throw new Error("Debes elegir una liga");
      }
      newTeam({
        variables: { team: teamInf },
        onCompleted: ({ createTeam }) => {
          setTeamID(createTeam);

          changeNextSection();
        },
        onError: showError,
      });
    } catch (error) {
      showError(error);
    }
  };

  const onSelectChange = (value) => {
    setTeamInf({ ...teamInf, league: value });
  };

  const handleChange = (e) => {
    setTeamInf({ ...teamInf, [e.target.name]: e.target.value });
  };

  return {
    onSubmit,
    onSelectChange,
    freeLeagues,
    handleChange,
    createTeamLoading,
  };
};
