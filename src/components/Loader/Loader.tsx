import React from "react";
import LoadingLogo from "./../../assets/images/neveragain-text-logo.svg";

const Loader: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center mt-7">
      <img src={LoadingLogo} alt="Loading Logo" className="w-16 h-16" />
    </div>
  );
};

export default Loader;
