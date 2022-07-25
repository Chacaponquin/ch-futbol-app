import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../../context/UserContext";
import { userRoles } from "../../../helpers/userRoles";

const CreateTrainer = () => {
  const { actualUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (actualUser.role !== userRoles.TRAINER) navigate("/dashboard");
  }, [actualUser, navigate]);

  return <div className="flex w-full px-20">CreateTrainer</div>;
};

export default CreateTrainer;
