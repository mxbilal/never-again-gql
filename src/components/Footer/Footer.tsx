import { Link } from "react-router-dom";
import { defineConfig } from 'vite';

import { Button } from "../ui/button";

import NeveragainTextLogo from "../../assets/images/footer/logo-text-black.svg";
import Instagram from "../../assets/images/footer/instagram.svg";
import Twitter from "../../assets/images/footer/twitter.svg";
import TikTok from "../../assets/images/footer/tiktok.svg";

import mpTracker from '../../lib/mixpanel';
import Home from "@/pages/Home";

const Footer = () => {
  
  const trackLinkClick = (tag) => {
    mpTracker.track(`Footer - Link - ${tag}`);
  };

  const appVersion = (window as any).__APP_VERSION__;

  return (
    <>
      <footer className="NeverScannerStatus">
        <div className="flex bg-white justify-between items-center flex-wrap my-4 py-6 mb-0 px-6">
          {/* Logo, Copyright, and Rights Reserved */}
          <div className="flex items-left flex-col">
            <Link onClick={() => trackLinkClick('Logo')} to="/">
              <img
                src={NeveragainTextLogo}
                alt="Never Again logo"
                className="w-[4.6rem] h-[4.6rem] mb-2"
              />
            </Link>
            <div className="text-sm">
              <p className="mx-2 text-xs">© 2023</p>
              <p className="mx-2 text-xs">All rights reserved.</p>
              <br />
              <p className="mx-2 text-xs text-slate-500">VERSION 1.0.5</p>
            </div>
          </div>  
          {/* Text Links */}
          <div className="text-center flex flex-col ml-1 flex-1 sm:text-center">
            <Link onClick={() => trackLinkClick('About Never Again')} className="mx-2" to="/about">About Never Again</Link> 
            <Link onClick={() => trackLinkClick('How to boycott?')} className="mx-2" to="/how-to-boycott">How to boycott?</Link>
            <Link onClick={() => trackLinkClick('FAQ')} className="mx-2" to="/faq">FAQ</Link>
            <Link onClick={() => trackLinkClick('Feedback')} className="mx-2" to="/contact">Feedback</Link>          
          </div>
          {/* Social Media Buttons */}
          <div className="flex flex-col my-3">
            <Button className="my-1" variant="secondary">
              <p className="text-xs">
                <a onClick={() => trackLinkClick('Instagram')} href="https://go.neveragain.app/instagram" target="_blank" rel="noopener noreferrer">
                  Follow us on Instagram
                </a>
              </p>
              <img
                src={Instagram}
                alt="Instagram"
                className="w-[1.313rem] h-[1.311rem] ml-[0.25rem]"
              />
            </Button>
            <Button className="my-1" variant="secondary">
              <p className="text-xs">
                <a onClick={() => trackLinkClick('Twitter')} href="https://go.neveragain.app/twitter" target="_blank" rel="noopener noreferrer">
                  Follow us on Twitter
                </a>
              </p>
              <img
                src={Twitter}
                alt="Twitter"
                className="w-[1.313rem] h-[1.311rem] ml-[0.25rem]"
              />
            </Button>
            <Button className="my-1" variant="secondary">
              <p className="text-xs">
                <a onClick={() => trackLinkClick('Tiktok')} href="https://go.neveragain.app/tiktok" target="_blank" rel="noopener noreferrer">
                  Follow us on Tiktok
                </a>
              </p>
              <img
                src={TikTok}
                alt="TikTok"
                className="w-[1.313rem] h-[1.311rem] ml-[0.25rem]"
              />
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;