import React, { useEffect, useRef } from "react";
import LoadingLogo from "./../../assets/images/neveragain-text-logo.svg";

const Loader: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fadeInOut = () => {
      if (logoRef.current) {
        logoRef.current.style.transition = "opacity 1s linear";
        logoRef.current.style.opacity = "0"; // Fade out
        setTimeout(() => {
          logoRef.current && (logoRef.current.style.opacity = "1"); // Fade in
        }, 1250); // Adjust duration as needed
      }
    };

    const interval = setInterval(fadeInOut, 750); // Interval for fade effect

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center mt-7">
      <br />
      <br />
      <br />
      <img
        ref={logoRef}
        src={LoadingLogo}
        alt="Loading Logo"
        className="w-36 h-36"
        style={{ opacity: 1 }} // Initially set opacity to 1
      />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Loader;