import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Facebook from "../../assets/images/facebook.png";
import Instagram from "../../assets/images/instagram.png";
import Twitter from "../../assets/images/twitter.png";

const Socials = () => {
  return (
    <div className="flex justify-center gap-1">
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar>
          <AvatarImage src={Facebook} />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar>
          <AvatarImage src={Instagram} />
          <AvatarFallback>IG</AvatarFallback>
        </Avatar>
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
        <Avatar>
          <AvatarImage src={Twitter} />
          <AvatarFallback>X</AvatarFallback>
        </Avatar>
      </a>
    </div>
  );
};

export default Socials;
