import React from "react";
import { useNavigate } from "react-router-dom";
import PeopleCard from "@/components/PeopleCard";
import BrandCategoryCard from "@/components/BrandCategoryCard";
import Loader from "@/components/Loader";

import { getCategories } from "@/api/hooks";

const Brands = () => {
  const navigate = useNavigate();

  const handleCelebritiesClick = () => {
    navigate("/categories/celebrities", {
      state: { id: "clozstgoh5tc60bl7p208rkne" },
    });
  };

  const handlePoliticiansClick = () => {
    navigate("/categories/politicians", {
      state: { id: "clozt1pu55v0s0bl5yb1r14oh" },
    });
  };

  // const handleCallBack = (event: any) => {
  //   console.log("callback", event);
  //   if (event?.title === "Politicians")
  //     navigate(`/categories/politicians?id=${event?.id}`);
  //   else navigate(`/categories/celebrities?id=${event?.id}`);
  // };

  let { loading, error, data } = getCategories();

  if (loading) {
    return <Loader />;
  }
  if (error) return <p>Error : {error.message}</p>;

  const filteredCategories = data.categories.filter(
    (category) =>
      category.name !== "Celebrity" && category.name !== "Politician"
  );

  return (
    <>
      <section className="w-full px-3 md:px-0 my-12 flex flex-col justify-center items-center">
        <div
          className="w-full md:gap-6 flex flex-col md:flex-row justify-center items-center"
          id="peopleCards"
        >
          {/* {data?.peopleCategories?.map?.((category) => {
            return (
              <PeopleCard
                variant={
                  category?.title === "Celebrity" ? "celebrity" : "politician"
                }
                handleClick={handleCallBack}
                category={category}
              />
            );
          })} */}
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
          {filteredCategories.map((category) => (
            <BrandCategoryCard key={category.id} variant={category.name} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Brands;
