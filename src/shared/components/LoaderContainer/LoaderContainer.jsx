import React from "react";
import Loader from "../../Loader/Loader";

const LoaderContainer = ({ loading, children, className }) => {
  return <>{loading ? <Loader className={className} /> : children}</>;
};

export default LoaderContainer;
