import React from "react";
import { Select, InputNumber } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { getAllCountries } from "../../../graphql/Extra/getAllCountries";
import { createLeague } from "../../../graphql/Leagues/createLeague";
import { showError, showSucces } from "../../../helpers/showNotifications";
import Loader from "../../../shared/Loader/Loader";
import { useNavigate } from "react-router";

const { Option } = Select;

const CreateLeague = () => {
  const navigate = useNavigate();

  const [allCountries, setAllCountries] = useState([]);
  const [leagueInf, setLeagueInf] = useState({
    name: null,
    country: null,
    teamMax: 15,
  });

  const [createLeagueMutation, { loading }] = useMutation(createLeague);

  useQuery(getAllCountries, {
    onCompleted: ({ getCountryList }) => setAllCountries(getCountryList),
  });

  const handleChangeCountry = (value) => {
    setLeagueInf({ ...leagueInf, country: value });
  };

  const handleSubmit = () => {
    const values = Object.values(leagueInf);
    for (let i = 0; i < values.length; i++) {
      if (!values[i]) {
        showError({
          message: "No puede dejar ninguno de los campos en blanco",
        });
        return;
      }
    }

    createLeagueMutation({
      variables: { league: leagueInf },
      onCompleted: () => {
        showSucces({
          description: "Se ha creado exitosamente la liga",
          header: "Exito al crear",
        });

        navigate({ pathname: "/dashboard" });
      },
      onError: showError,
    });
  };

  return (
    <div className="flex w-full justify-center px-3">
      <div className="bg-slate-100 px-10 py-5 gap-5 flex flex-col w-[700px] relative top-16 esm:px-5">
        <h1 className="font-monserratBold text-3xl text-center">
          Create League
        </h1>

        <div className="flex flex-col text-lg gap-4 esm:text-base">
          <div className="flex gap-4 items-center flex-row esm:flex-col esm:items-start">
            <div className="flex flex-col gap-1 w-[60%] esm:flex-row esm:items-center esm:gap-4 esm:w-full">
              <label className="font-bold">Name:</label>
              <input
                type="text"
                className="outline-none border-2 text-sm px-4 py-2 esm:w-full"
                placeholder="League Name..."
                onChange={(e) =>
                  setLeagueInf({ ...leagueInf, name: e.target.value })
                }
              />
            </div>

            <div className="flex gap-1 flex-col w-[40%] esm:flex-row esm:items-center esm:gap-4 esm:w-full">
              <label className="font-bold">Equipos:</label>
              <InputNumber
                max={28}
                min={15}
                step={1}
                className="!w-full"
                defaultValue={15}
                onChange={(value) =>
                  setLeagueInf({ ...leagueInf, teamMax: value })
                }
              />
            </div>
          </div>

          <div className="flex gap-1 flex-col esm:flex-row esm:items-center esm:gap-4 esm:w-full">
            <label className="font-bold">Country:</label>
            <Select className="w-full" onChange={handleChangeCountry}>
              {allCountries.map((el, i) => (
                <Option value={el} key={i}>
                  {el}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex justify-end w-full">
          {loading ? (
            <Loader className={"w-[80px]"} />
          ) : (
            <button
              className="font-bold py-2 px-7 text-lg bg-primary_color text-white esm:px-5 esm:text-base"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLeague;
