import Search from "@/components/Search";
import BrandCard from "@/components/BrandCard/BrandCard";
import { Button } from "@/components/ui/button";

import Loader from "@/components/Loader";
import { useBrands } from "@/api/hooks";
import { useState, useEffect } from "react";

const Home = () => {
  const [value, setValue] = useState("");
  const [first, setFirst] = useState(10);
  let { loading, error, data, refetch } = useBrands({
    orderBy: "createdAt_ASC",
    value: "",
    first,
  });
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
    refetch({ value: "", first });
  }, [first]);
  // useEffect(() => {
  //   if (value.length > 2 && refetch) refetch({ value });
  // }, [value]);

  if (loading) {
    return <Loader />;
  }
  if (error) return <p>Error : {error.message}</p>;
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full px-6 md:px-3 my-4">
        <Search isBrandSearch={true} onSearch={handleSearch()} />
      </div>
      <div
        className="w-full mb-4 px-3 flex justify-between items-start"
        id="latestBrands"
      >
        <h3>Latest brands</h3>
        <Button variant="outline" onClick={() => setFirst(1000)}>
          <p className="text-base">View All</p>
        </Button>
      </div>
      <div
        className="w-full flex flex-col flex-nowrap justify-center items-center"
        id="brandCards"
      >
        {data?.brands?.map?.((brand: any) => {
          return (
            <BrandCard
              key={brand?.id}
              imageSrc={brand?.icon?.url}
              brandTitle={brand?.name}
              brand={brand}
            />
          );
        })}
      </div>
      {/* <div className="w-full my-3 px-3 flex justify-start items-start">
        <Button variant="outline">
          <p className="text-base">View All</p>
        </Button>
      </div> */}
    </section>
  );
};

export default Home;
