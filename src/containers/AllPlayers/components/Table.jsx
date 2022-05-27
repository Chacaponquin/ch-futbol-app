import { Checkbox } from "antd";
import React from "react";

const Table = ({ players, handleChange }) => {
  const tableHeader = [
    "Player",
    "Country",
    "Gender",
    "Position",
    "Age",
    "Price",
    "Team",
  ];

  return (
    <table className="table-auto w-full rounded-lg">
      <thead>
        <tr className="bg-slate-200">
          {tableHeader.map((header, i) => (
            <th key={i} className="text-left text-lg py-5 first:pl-6">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {players.map(
          (
            {
              _id,
              image,
              fullName,
              country,
              gender,
              position,
              age,
              actualTeamInf,
              price,
            },
            i
          ) => (
            <tr key={i} className="font-bold text-sm ">
              <td className="flex py-5 items-center pl-6 space-x-5">
                <Checkbox className="" onChange={handleChange} id={_id} />
                <img
                  src={image}
                  alt={fullName}
                  className="rounded-full w-[50px] h-[50px]"
                />
                <p className="mb-0">{fullName}</p>
              </td>
              <td>{country}</td>
              <td>{gender}</td>
              <td>{position}</td>
              <td>{age}</td>
              <td>{price}</td>

              {actualTeamInf ? (
                <td className="">
                  <div className="flex items-center">
                    <img
                      src={actualTeamInf?.image}
                      alt={actualTeamInf?.name}
                      className="rounded-full mr-4 w-[50px] h-[50px]"
                    />
                    <p className="mb-0">{actualTeamInf?.name}</p>
                  </div>
                </td>
              ) : (
                <td>
                  <button className="px-5 py-2 rounded-full bg-success_color text-white">
                    Free
                  </button>
                </td>
              )}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;
