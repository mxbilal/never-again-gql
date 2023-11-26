import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicFigureCard from "@/components/PublicFigureCard";
import { useState, useEffect } from "react";

import Generic from "../assets/images/generic-profile-pic.jpg";

import Loader from "@/components/Loader";
import { getCategoryPeoples } from "@/api/hooks";
const Politicians: React.FC = () => {
  const location = useLocation();
  const { id } = location.state;
  const [first, setFirst] = useState(10);
  const { loading, error, data, refetch } = getCategoryPeoples({ id });

  useEffect(() => {
    if (first > 10) refetch({ value: "", first });
  }, [first]);

  if (loading) {
    return <Loader />;
  }

  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className="w-full my-12 flex flex-col justify-center items-center">
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4"
        id="publicFigureCards"
      >
        {data?.peopleCategory?.peoples?.map?.((people) => {
          return (
            <PublicFigureCard
              key={people.name}
              name={people?.name}
              variant="celebrity"
              imageUrl={people?.profileUrl ?? Generic}
              people={people}
            />
          );
        })}
      </div>
      <div className="w-full px-6 md:px-3 flex justify-start items-start my-3">
        <Button variant="outline" onClick={() => setFirst(1000)}>
          <p className="text-base leading-[1rem]">View All</p>
        </Button>
      </div>
    </section>
  );
};

export default Politicians;
