import React from "react";

const TotalStats = ({ totalAssists, totalGoals }) => {
  return (
    <div className="flex">
      <div className="flex justify-center w-full space-x-5">
        <div className="flex space-x-2">
          <h1 className="font-bold">Total Goals:</h1>
          <p>{totalGoals}</p>
        </div>
        <div className="flex space-x-2">
          <h1 className="font-bold">Total Assists:</h1>
          <p>{totalAssists}</p>
        </div>
      </div>
    </div>
  );
};

export default TotalStats;
