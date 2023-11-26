import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SocialsProps } from "@/types";

import Facebook from "../../assets/images/facebook.png";
import Instagram from "../../assets/images/instagram.png";
import Twitter from "../../assets/images/twitter.png";

const Socials: React.FC<SocialsProps> = ({
  facebookLink,
  instagramLink,
  twitterLink,
}) => {
  return (
    <div className="flex justify-center gap-1">
      <a
        href={facebookLink || "https://www.facebook.com/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar>
          <AvatarImage src={Facebook} />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
      </a>
      <a
        href={instagramLink || "https://www.instagram.com/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar>
          <AvatarImage src={Instagram} />
          <AvatarFallback>IG</AvatarFallback>
        </Avatar>
      </a>
      <a
        href={twitterLink || "https://twitter.com/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar>
          <AvatarImage src={Twitter} />
          <AvatarFallback>X</AvatarFallback>
        </Avatar>
      </a>
    </div>
  );
};

export default Socials;
