import React from "react";
import { Link } from "react-router-dom";

import NeveragainLogo from "../../assets/images/neveragain-logo.svg";
import mpTracker from '../../lib/mixpanel';

const Header = () => {
  const track = () => {
    mpTracker.track('Header - Link - Logo');
  };
  return (
    <>
      <div className="flex justify-center items-center w-full py-6 NeverScannerStatus">
        <Link to="/" onClick={track}>
          <img
            src={NeveragainLogo}
            alt="Never Again logo"
            className="w-[7.9rem] h-[7.9rem]"
          />
        </Link>
      </div>
    </>
  );
};

export default Header;
