import React from "react";
import { useNavigate } from "react-router-dom";
import PeopleCard from "@/components/PeopleCard";
import BrandCategoryCard from "@/components/BrandCategoryCard";
import { brandCategories } from "@/constants";
import { getCategories } from "@/api/hooks";

const Brands = () => {
  const navigate = useNavigate();

  const handleCelebritiesClick = () => {
    navigate("/categories/celebrities");
  };

  const handlePoliticiansClick = () => {
    navigate("/categories/politicians");
  };

  let { loading, error, data } = getCategories();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <section className="w-full px-3 md:px-0 my-12 flex flex-col justify-center items-center">
        <div
          className="w-full md:gap-6 flex flex-col md:flex-row justify-center items-center"
          id="peopleCards"
        >
          <PeopleCard
            variant="celebrity"
            handleClick={handleCelebritiesClick}
          />
          <PeopleCard
            variant="politician"
            handleClick={handlePoliticiansClick}
          />
        </div>
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4"
          id="brandCategoryCards"
        >
          {data &&
            data.categories.map((category) => (
              <BrandCategoryCard key={category.id} variant={category.name} />
            ))}
        </div>
      </section>
    </>
  );
};

export default Brands;