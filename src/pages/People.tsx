import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";

import PeopleCard from "@/components/PeopleCard";
import PublicFigureCard from "@/components/PublicFigureCard";

import Gal from "../assets/images/gal-gadot.jpeg";
import Jerry from "../assets/images/jerry-seinfeld.jpeg";
import Kareem from "../assets/images/kareem.jpeg";
import Dwayne from "../assets/images/dwayne-johnson.jpeg";
import { getPeople, getPeopleCategories } from "@/api/hooks";

const People = () => {
  const [value, setValue] = useState("");
  const [first, setFirst] = useState(10);
  const navigate = useNavigate();
  const { loading, error, data } = getPeopleCategories();
  const { pLoad, pError, pData, refetch } = getPeople({ value, first });
  const handleCallBack = (event: any) => {
    console.log("callback", event);
    if (event?.title === "Politicians")
      navigate(`/categories/politicians?id=${event?.id}`);
    else navigate(`/categories/celebrities?id=${event?.id}`);
  };

  // const handlePoliticiansClick = () => {
  //   navigate("/categories/politicians");
  // };

  // currently static TODO to dynamically direct to celebrities or politicians route and remove from publicfigurecard maybe
  const handlePublicFigureClick = (publicFigureSlug: string) => {
    navigate(`/categories/celebrities/${publicFigureSlug}`);
  };

  function debounce() {
    let timer;
    return (args) => {
      console.log("args", args);
      clearTimeout(timer);
      timer = setTimeout(() => {
        refetch({ value: args });
      }, 1000);
    };
  }
  const handleSearch = () => {
    // setValue(value)
    return debounce(value);
  };
  useEffect(() => {
    console.log("rr");
    refetch({ value: "", first });
  }, [first]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data", data, first);
  return (
    <>
      <section className="w-full flex flex-col justify-center items-center">
        <div className="w-full px-6 md:px-3 my-4">
          <Search isBrandSearch={false} onSearch={handleSearch()} />
        </div>
        <div
          className="w-full md:gap-6 flex flex-col md:flex-row justify-center items-center"
          id="peopleCards"
        >
          {data?.peopleCategories?.map?.((category) => {
            return (
              <PeopleCard
                variant={
                  category?.title === "Celebrity" ? "celebrity" : "politician"
                }
                handleClick={handleCallBack}
                category={category}
              />
            );
          })}
          {/* <PeopleCard
            variant="celebrity"
            handleClick={handleCelebritiesClick}
          />
          <PeopleCard
            variant="politician"
            handleClick={handlePoliticiansClick}
          /> */}
        </div>
        <div
          className="w-full my-3 px-3 flex justify-between items-center"
          id="latestPeople"
        >
          <h3>Latest public figures</h3>
          <Button variant="outline" onClick={() => setFirst(1000)}>
            <p className="text-base">View All</p>
          </Button>
        </div>
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4"
          id="publicFigureCards"
        >
          {pData &&
            pData?.peoples.map((people) => (
              <PublicFigureCard
                name={people?.name}
                variant="celebrity"
                imageUrl={people?.profileUrl ?? Gal}
                people={people}
              />
            ))}
        </div>
        {/* <div className="w-full px-6 md:px-3 flex justify-start items-start my-3">
          <Button variant="outline">
            <p className="text-base">View All</p>
          </Button>
        </div> */}
      </section>
    </>
  );
};

export default People;
