import React from "react";

const EmptyPlayersArray = ({ message }) => {
  return (
    <div
      className="flex w-full h-full justify-center items-center text-xl"
      value={message}
    >
      {message}
    </div>
  );
};

export default EmptyPlayersArray;
