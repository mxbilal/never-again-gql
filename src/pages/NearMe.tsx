import React, { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks";
import { brandsNearMe, getBrandCount } from "@/api/hooks";
import BrandCard from "@/components/BrandCard/BrandCard";
import Loader from "@/components/Loader";

const NearMe: React.FC = () => {
  const userLocation = useGeolocation();
  let { countLoading, countError, countData } = getBrandCount();
  let { loading, error, data, refetch } = brandsNearMe({
    orderBy: "createdAt_ASC",
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    first: 0,
    skip: 0
  });
  // const[ count, setCount ] = useState(countData)
  // setCount(countData)
  // const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    // setCount(countData)
    if(countData){
      getBrandsNearMe()
    }
  }, [countData])
  console.log("data is here", data)

  useEffect(() => {
    console.log("data is here", data)

    if(data?.brands?.length){
      setBrands([...brands, ...data?.brands])
    }
  }, [data?.brands])
  async function getBrandsNearMe(){
    // setLoading(true)
    console.log("countData", countData);
    
    if(countData?.brandsConnection?.aggregate?.count >= 100){
      for(let i = 0; i < Math.ceil(countData?.brandsConnection?.aggregate?.count / 100); i++ ){
        // setTimeout(() => {
          await  refetch({ first: 100, skip: i*100 })
        // }, 1000)
      }
      // setBrands(brandsArray)
    } else {
      await refetch({ first: 100, skip: 0 })
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
  console.log("Brands near me", filteredBrands, "brands", brands)

  return (
    <>
      <section className="w-full flex flex-col justify-center items-center my-12 mx-4 md:mx-0">
        <div className="w-full text-center">
          {userLocation.address !== null && (
            <>
              <p>
                Your current address: {userLocation.address}
                <br />
                Latitude: {userLocation.latitude}, Longitude:{" "}
                {userLocation.longitude}
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

// import React from "react";
// import { useGeolocation } from "@/hooks";
// import { brandsNearMe } from "@/api/hooks";
// import BrandCard from "@/components/BrandCard/BrandCard";
// const NearMe: React.FC = () => {
//   const userLocation = useGeolocation();
//   var { loading, error, data } = brandsNearMe("createdAt_ASC", userLocation.latitude, userLocation.longitude);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;
//   // console.log("data", data)
//   return (
//     <>
//       <section className="w-full flex flex-col justify-center items-center my-12 mx-4 md:mx-0">
//         <div className="w-full text-center">
//           {/* // add conditional rendering of another level to check whether any brands are found or not and show appropriate UI */}
//           {userLocation.address !== null && (
//             <>
//               <p>
//                 Your current address: {userLocation.address}
//                 <br />
//                 Latitude: {userLocation.latitude}, Longitude:{" "}
//                 {userLocation.longitude}
//               </p>
//               {
//                 data?.brands?.filter((brand: any) => brand?.gps?.distance && brand?.gps?.distance / 1000 < 5)?.map?.((brand: any) => {
//                   return (
//                     <BrandCard
//                       imageSrc={brand?.icon?.url}
//                       brandTitle={brand?.name}
//                       brand={brand}
//                     />
//                   );
//                 })
//               }
//             </>

//           )}

//           {userLocation.address === null && (
//             <h2>
//               We couldn't place your location, please enable the permission to
//               view the brands to boycott nearby.
//             </h2>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default NearMe;
