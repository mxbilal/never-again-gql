import React, { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks";
import { brandsNearMe, getBrandCount } from "@/api/hooks";
import BrandCard from "@/components/BrandCard/BrandCard";
import Loader from "@/components/Loader";

const NearMe: React.FC = () => {
  const userLocation = useGeolocation();
  let { countLoading, countError, countData } = getBrandCount();
  let { loading, error, data, refetch } = brandsNearMe({
    orderBy: "createdAt_DESC",
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    first: 0,
    skip: 0,
  });
  // const[ count, setCount ] = useState(countData)
  // setCount(countData)
  // const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    // setCount(countData)
    if (userLocation.address && countData) {
      getBrandsNearMe();
    }
  }, [userLocation, countData]);
  console.log("data is here", data);

  useEffect(() => {
    console.log("data is here", data);

    if (data?.brands?.length) {
      setBrands([...brands, ...data?.brands]);
    }
  }, [data?.brands]);
  async function getBrandsNearMe() {
    // setLoading(true)
    console.log("countData", countData);

    if (countData?.brandsConnection?.aggregate?.count >= 100) {
      for (
        let i = 0;
        i < Math.ceil(countData?.brandsConnection?.aggregate?.count / 100);
        i++
      ) {
        // setTimeout(() => {
        await refetch({ first: 100, skip: i * 100 });
        // }, 1000)
      }
      // setBrands(brandsArray)
    } else {
      await refetch({ first: 100, skip: 0 });
    }
    // setBrands([data])
  }
  // var { loading, error, data } = brandsNearMe(
  //   "createdAt_ASC",
  //   userLocation.latitude,
  //   userLocation.longitude
  // );

  if (loading || countLoading) {
    return <Loader />;
  }

  if (countError) return <p>Error : {error.message}</p>;

  // Filter brands based on distance of 4 miles
  const filteredBrands = brands?.filter(
    (brand: any) => brand?.gps?.distance && brand?.gps?.distance / 1000 < 6.44
  );
  console.log("Brands near me", filteredBrands, "brands", brands);

  return (
    <>
      <section className="px-3 my-12 md:px-0 w-full flex flex-col justify-center items-center">
        <div className="w-full text-center overflow-x-hidden">
          {userLocation.address !== null && (
            <>
              <p className="border">
                Your current address: <br />
                {userLocation.address}
                <br />
                Latitude: {userLocation.latitude?.toFixed(3)}, Longitude:{" "}
                {userLocation.longitude?.toFixed(3)}
              </p>
              {filteredBrands?.map?.((brand: any) => (
                <BrandCard
                  key={brand?.id}
                  imageSrc={brand?.icon?.url}
                  brandTitle={brand?.name}
                  brand={brand}
                />
              ))}
              {filteredBrands && filteredBrands.length === 0 && (
                <h2>No brands found near your location.</h2>
              )}
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
