import { Link } from "react-router-dom";

import { Button } from "../ui/button";

import NeveragainTextLogo from "../../assets/images/neveragain-text-logo.svg";
import Instagram from "../../assets/images/instagram.svg";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-4">
        <div className="flex justify-center items-center mb-4">
          - - - - - - - - - - - - - - - - -
        </div>
        <div
          className="flex flex-col justify-center items-center underline"
          id="footerLinks"
        >
          <Link to="/about">About Never Again</Link>
          <Link to="/how-to-boycott">How to boycott?</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <Button className="my-4" variant="secondary">
          <p className="text-base">Follow us on Instagram</p>
          <img
            src={Instagram}
            alt="Instagram"
            className="w-[1.313rem] h-[1.311rem] ml-[0.25rem]"
          />
        </Button>
        <img
          src={NeveragainTextLogo}
          alt="Never Again logo"
          className="w-[4.6rem] h-[4.6rem]"
        />
        <p>© 2023</p>
        <p>All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
