import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { findAvailableLeagues, createTeamMutation } from "../../../graphql";
import { showError } from "../../../helpers/showError";

export const useFormHook = (setTeamID) => {
  const [formOpen, setFormOpen] = useState(true);

  const { data: freeLeagues } = useQuery(findAvailableLeagues, {
    onError: showError,
  });
  const [newTeam] = useMutation(createTeamMutation, {
    onError: showError,
    onCompleted: (data) => setTeamID(data.createTeam),
  });

  const onSubmit = (formData) => {
    newTeam({ variables: { team: formData } });
  };

  const handleOpenForm = () => {
    setFormOpen(!formOpen);
  };

  return {
    onSubmit,
    handleOpenForm,
    freeLeagues,
    formOpen,
  };
};
