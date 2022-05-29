import React, { useState } from "react";
import { Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { fetchAllPlayers } from "../../graphql/Players/fetchAllPlayers";
import { showError, showSucces } from "../../helpers/showNotifications";
import Table from "./components/Table";
import { deletePlayer } from "../../graphql/Players/deletePlayer";
import { FaPlus } from "react-icons/fa";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";

const AllPlayers = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectPlayers, setSelectPlayers] = useState([]);

  const handlePushSelectPlayer = (e) => {
    if (e.target.checked) {
      setSelectPlayers([...selectPlayers, e.target.id]);
    } else {
      setSelectPlayers(selectPlayers.filter((el) => el !== e.target.id));
    }
  };

  const deleteButtonClass = clsx(
    "py-2 px-7 bg-danger_color text-white trasnsition-all duration-300 font-bold esm:px-4",
    { "!bg-slate-200": !selectPlayers.length },
    { "text-black": !selectPlayers.length }
  );

  useQuery(fetchAllPlayers, {
    onCompleted: ({ fetchAllPlayers }) => {
      setAllPlayers(fetchAllPlayers);
    },
    onError: showError,
  });

  const [deletePlayers, { loading: deleteLoading }] = useMutation(
    deletePlayer,
    {
      onCompleted: () => {
        showSucces({
          header: "Exito",
          description: "Se han eliminado los jugadores con exito",
        });
      },
      onError: showError,
    }
  );

  return (
    <div className="w-full exsm:px-3 esm:px-5 sm:px-7 md:px-16 lg:px-32">
      <h1 className="font-monserratBold text-3xl esm:text-center">
        All Players
      </h1>

      <div className="border-2 py-5 px-10 esm:px-5">
        <div className="w-full py-6 flex justify-between text-base items-center esm:flex-col esm:space-y-3 sm:flex-col sm:space-y-3 md:flex-row md:space-y-0">
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className="w-[300px]"
          ></Select>

          <div className="flex space-x-4 items-center esm:text-sm">
            {deleteLoading ? (
              <Loader className="text-sm h-[70px] px-6" />
            ) : (
              <button
                className={deleteButtonClass}
                disabled={!selectPlayers.length}
                onClick={() =>
                  deletePlayers({
                    variables: { players: { players: selectPlayers } },
                  })
                }
              >
                Delete
              </button>
            )}

            <Link to={"/createPlayer"}>
              <button className="py-2 px-7 bg-primary_color text-white flex items-center space-x-3 font-bold esm:px-4">
                <FaPlus />
                <p className="mb-0">Add Player</p>
              </button>
            </Link>
          </div>
        </div>

        <Table players={allPlayers} handleChange={handlePushSelectPlayer} />
      </div>
    </div>
  );
};

export default AllPlayers;
