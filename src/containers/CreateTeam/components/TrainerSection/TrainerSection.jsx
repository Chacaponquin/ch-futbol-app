import { useMutation, useQuery } from "@apollo/client";
import { Checkbox } from "antd";
import React, { useState } from "react";
import { getFreeTrainers } from "../../../../graphql/Trainer/getFreeTrainers";
import noDataPucture from "../../../../assets/images/no-data.png";
import clsx from "clsx";
import { buttonClass, headerClass } from "../../helpers/classes";
import { createOffert } from "../../../../graphql/Offerts/createOffert";
import { useContext } from "react";
import UserContext from "../../../../context/UserContext";
import { showError } from "../../../../helpers/showNotifications";
import SubmitButton from "../SubmitButton";

const TrainerSection = ({ changeNextSection, teamID }) => {
  const { actualUser } = useContext(UserContext);

  const [freeTrainers, setFreeTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);

  const [createTrainerOfferts, { loading: createOffertsLoading }] =
    useMutation(createOffert);

  useQuery(getFreeTrainers, {
    onCompleted: ({ getFreeTrainers }) => setFreeTrainers(getFreeTrainers),
  });

  const handleSelectTrainer = (ev, id) => {
    if (ev.target.checked) setSelectedTrainers([...selectedTrainers, id]);
    else {
      const filt = selectedTrainers.filter((el) => el !== id);
      setSelectedTrainers(filt);
    }
  };

  const handleSubmit = () => {
    createTrainerOfferts({
      variables: {
        offert: {
          type: "TRAINER",
          owner: actualUser._id,
          salary: 0,
          to: selectedTrainers,
          team: teamID,
        },
      },
      onCompleted: () => changeNextSection(),
      onError: showError,
    });
  };

  const trainerDivClass = (id) => {
    const find = selectedTrainers.find((el) => el === id);

    return clsx(
      "flex w-full py-3 px-4 items-center gap-4 rounded-md",
      {
        "bg-primary_color text-white": find,
      },
      { "bg-transparent text-black": !find }
    );
  };

  const trainerButtonClass = clsx(buttonClass, {
    "bg-slate-200 text-black": selectedTrainers.length === 0,
  });

  return (
    <div className="w-full bg-slate-100 flex flex-col px-10 py-5">
      <h1 className={headerClass}>Elige un Entrenador</h1>

      <div className="flex flex-col w-full gap-1 pt-4">
        <TrainersContainer
          trainers={freeTrainers}
          trainerDivClass={trainerDivClass}
          handleSelectTrainer={handleSelectTrainer}
        />
      </div>

      <SubmitButton
        className={trainerButtonClass}
        text="Next"
        onClick={handleSubmit}
        disabled={selectedTrainers.length > 0 ? false : true}
        loading={createOffertsLoading}
      />
    </div>
  );
};

const TrainersContainer = ({
  trainers,
  trainerDivClass,
  handleSelectTrainer,
}) => {
  return (
    <>
      {trainers.length > 0 ? (
        trainers.map(({ _id, image, fullName }, i) => (
          <div className={trainerDivClass(_id)} key={i}>
            <Checkbox onChange={(ev) => handleSelectTrainer(ev, _id)} />

            <img
              src={image}
              alt={fullName}
              className={"rounded-full w-[50px] h-[50px] object-cover"}
            />
            <h1 className="mb-0 font-bold text-base text-inherit">
              {fullName}
            </h1>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={noDataPucture}
            alt="no-data"
            className="object-cover w-[500px]"
          />
          <h1 className="text-center font-monserratBold text-3xl -translate-y-5 text-slate-700 mb-0 esm:text-xl">
            No hay entrenadores disponibles
          </h1>
        </div>
      )}
    </>
  );
};

export default TrainerSection;
