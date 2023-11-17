import React from "react";
import Search from "@/components/Search";
import BrandCard from "@/components/BrandCard/BrandCard";
import { Button } from "@/components/ui/button";

import Hyundai from "../assets/images/hyundai-logo.jpg";
import Mercedes from "../assets/images/mercedes-logo.png";
import RentalCars from "../assets/images/rental-cars-logo.svg";
import { useParams } from "react-router-dom";
import { exploreCategories } from "@/api/hooks";

const BrandCategory = () => {
  const { name } = useParams();
  let { loading, error, data } = exploreCategories(name);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full px-6 md:px-3 my-4">
        <Search isBrandSearch={true} />
      </div>
      <div
        className="w-full my-3 px-3 flex justify-between items-center"
        id="latestBrands"
      >
        <h3>Latest brands</h3>
        <Button variant="outline">
          <p className="text-base">View All</p>
        </Button>
      </div>
      <div
        className="w-full flex flex-col flex-nowrap justify-center items-center"
        id="brandCards"
      > 
        {data &&
          data.brands.map((brand) => (
            <BrandCard
              imageSrc={brand?.icon?.url}
              brandTitle={brand?.name}
              brand={brand}
            />
          ))}
      </div>
      <div className="w-full my-3 px-3 flex justify-start items-start">
        <Button variant="outline">
          <p className="text-base">View All</p>
        </Button>
      </div>
    </section>
  );
};

export default BrandCategory;
