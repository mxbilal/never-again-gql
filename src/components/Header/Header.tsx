import React from "react";

import NeveragainLogo from "../../assets/images/neveragain-logo.svg";

const Header = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full py-12">
        <img
          src={NeveragainLogo}
          alt="Never Again logo"
          className="w-[10.9rem] h-[10.9rem]"
        />
      </div>
    </>
  );
};

export default Header;
