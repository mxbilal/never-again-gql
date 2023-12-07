import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SocialsProps } from "@/types";
import FacebookIcon from "../../assets/images/facebook.png";
import InstagramIcon from "../../assets/images/instagram.png";
import TwitterIcon from "../../assets/images/twitter.png";
import mpTracker from '../../lib/mixpanel';

const Socials: React.FC<SocialsProps> = ({
  profileName,
  facebookLink,
  instagramLink,
  twitterLink,
}) => {
  const trackLinkClick = (tag: string) => {
    mpTracker.track(`Boycott Social - ${tag} - ${profileName}`);
  };

  const openInNewTab = (url: string, tag: string) => {
    trackLinkClick(tag);
    window.open(url, '_blank')?.focus();
  };

  return (
    <div className="flex justify-center gap-1">
      <button
        onClick={() => openInNewTab(facebookLink || "https://www.facebook.com/", 'Facebook')}
      >
        <Avatar>
          <AvatarImage src={FacebookIcon} />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
      </button>
      <button
        onClick={() => openInNewTab(instagramLink || "https://www.instagram.com/", 'Instagram')}
      >
        <Avatar>
          <AvatarImage src={InstagramIcon} />
          <AvatarFallback>IG</AvatarFallback>
        </Avatar>
      </button>
      <button
        onClick={() => openInNewTab(twitterLink || "https://twitter.com/", 'Twitter')}
      >
        <Avatar>
          <AvatarImage src={TwitterIcon} />
          <AvatarFallback>X</AvatarFallback>
        </Avatar>
      </button>
    </div>
  );
};

export default Socials;