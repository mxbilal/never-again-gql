import { useState, useEffect } from "react";

const mapboxApiKey = import.meta.env.VITE_REACT_APP_MAPBOX_API_KEY;

const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState<{
    address: string | null;
    latitude: number | null;
    longitude: number | null;
  }>({
    address: null,
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const mapboxApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxApiKey}`;

          fetch(mapboxApiUrl)
            .then((response) => response.json())
            .then((data) => {
              const street = data.features[0]?.properties?.address || "";
              const city =
                data.features[0]?.context?.find((context: { id: string }) =>
                  context.id.startsWith("place")
                )?.text || "";

              const formattedAddress =
                street && city ? `${street}, ${city}` : "Address not available";

              setUserLocation({
                address: formattedAddress,
                latitude,
                longitude,
              });
            })
            .catch((error) => {
              console.error("Error fetching Mapbox geocoding data:", error);
              setUserLocation({
                address: "Error fetching location",
                latitude: null,
                longitude: null,
              });
            });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserLocation({
            address: "Error getting location",
            latitude: null,
            longitude: null,
          });
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
      setUserLocation({
        address: "Geolocation is not supported",
        latitude: null,
        longitude: null,
      });
    }
  }, []);

  return userLocation;
};

export default useGeolocation;
