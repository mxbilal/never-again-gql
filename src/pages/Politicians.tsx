import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicFigureCard from "@/components/PublicFigureCard";

import Gal from "../assets/images/gal-gadot.jpeg";
// import Jerry from "../assets/images/jerry-seinfeld.jpeg";
// import Kareem from "../assets/images/kareem.jpeg";
// import Dwayne from "../assets/images/dwayne-johnson.jpeg";
import { getCategoryPeoples } from "@/api/hooks";
const Politicians: React.FC = () => {
  const navigate = useNavigate();
  const [params ] = useSearchParams();
  console.log("params", params.get("id"))
  const { loading, error, data } = getCategoryPeoples({ id: params.get("id") })
  const handlePoliticianClick = (politicianName: string) => {
    navigate(`/categories/politicians/${politicianName}`);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data", data)
  return (
    <section className="w-full my-12 flex flex-col justify-center items-center">
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4"
        id="publicFigureCards"
      >
        {
          data?.peopleCategory?.peoples?.map?.(people => {
            return(
              <PublicFigureCard name={people?.name} variant="celebrity" imageUrl={Gal} people={people} />
            )
          })
        }
        {/* <PublicFigureCard
          name="Jerry Seinfeld"
          variant="celebrity"
          imageUrl={Jerry}
        />
        <PublicFigureCard
          name="Kareem Abdul-Jabbar"
          variant="celebrity"
          imageUrl={Kareem}
        />
        <PublicFigureCard
          name="Dwayne Johnson"
          variant="celebrity"
          imageUrl={Dwayne}
        /> */}
      </div>
      <div className="w-full px-6 md:px-3 flex justify-start items-start my-3">
        <Button variant="outline">
          <p className="text-base">View All</p>
        </Button>
      </div>
    </section>

    // <h2>Politicians</h2>
    // <ul>
    //   <li>
    //     <button onClick={() => handleCelebClick("Rihanna")}>Rihanna</button>
    //   </li>
    //   <li>
    //     <button onClick={() => handleCelebClick("Beyonce")}>Beyonce</button>
    //   </li>
    // </ul>
  );
};

export default Politicians;
