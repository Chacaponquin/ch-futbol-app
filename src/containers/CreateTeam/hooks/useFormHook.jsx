import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { findAvailableLeagues, createTeamMutation } from "../../../graphql";
import { showError } from "../../../helpers/showError";

export const useFormHook = (setTeamID) => {
  const [formOpen, setFormOpen] = useState(true);
  const [leagueSelect, setLeagueSelect] = useState("");

  const { data: freeLeagues } = useQuery(findAvailableLeagues, {
    onError: showError,
  });
  const [newTeam] = useMutation(createTeamMutation, {
    onError: showError,
    onCompleted: (data) => setTeamID(data.createTeam),
  });

  const onSubmit = (formData) => {
    if (leagueSelect) {
      newTeam({ variables: { team: { ...formData, league: leagueSelect } } });
    } else showError({ message: "Debes seleccionar una liga" });
  };

  const onSelectChange = (value) => {
    setLeagueSelect(value);
  };

  const handleOpenForm = () => {
    setFormOpen(!formOpen);
  };

  return {
    onSubmit,
    onSelectChange,
    handleOpenForm,
    freeLeagues,
    formOpen,
  };
};
