import React from "react";
import Loader from "../../../shared/Loader/Loader";

const SubmitButton = ({
  className,
  loading,
  text,
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <div className="flex w-full justify-end">
      {loading ? (
        <Loader className="w-[80px]" />
      ) : (
        <button className={className} onClick={onClick} disabled={disabled}>
          {text}
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
