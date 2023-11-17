import React from "react";
import { useGeolocation } from "@/hooks";

const NearMe: React.FC = () => {
  const userLocation = useGeolocation();

  return (
    <>
      <section className="w-full flex flex-col justify-center items-center my-12 mx-4 md:mx-0">
        <div className="w-full text-center">
          {/* // add conditional rendering of another level to check whether any brands are found or not and show appropriate UI */}
          {userLocation.address !== null && (
            <>
              <p>
                Your current address: {userLocation.address}
                <br />
                Latitude: {userLocation.latitude}, Longitude:{" "}
                {userLocation.longitude}
              </p>
            </>
          )}
          {userLocation.address === null && (
            <h2>
              We couldn't place your location, please enable the permission to
              view the brands to boycott nearby.
            </h2>
          )}
        </div>
      </section>
    </>
  );
};

export default NearMe;
