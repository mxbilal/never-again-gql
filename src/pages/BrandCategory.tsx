import Search from "@/components/Search";
import BrandCard from "@/components/BrandCard/BrandCard";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { exploreCategories } from "@/api/hooks";
import Loader from "@/components/Loader";

const BrandCategory = () => {
  const [value, setValue] = useState("");
  const [first, setFirst] = useState(10);
  const location = useLocation();
  const { name } = location.state;
  let { loading, error, data, refetch } = exploreCategories(name, "", first);
  useEffect(() => {
    refetch({ value: "", first });
  }, [first]);
  function debounce() {
    let timer;
    return (args) => {
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
  if (loading) {
    return <Loader />;
  }
  if (error) return <p>Error : {error.message}</p>;
  return (
    <section className="w-full flex flex-col justify-center items-center">
      {/* <div className="w-full px-6 md:px-3 my-4">
        <Search isBrandSearch={true} onSearch={handleSearch()} />
      </div>*/}
      <div
        className="px-3 md:px-0 my-12 w-full flex flex-col flex-nowrap justify-center items-center"
        id="brandCards"
      >
        {data && data.brands.length > 0 ? (
          data.brands.map((brand) => (
            <BrandCard
              key={brand?.id}
              imageSrc={brand?.icon?.url}
              brandTitle={brand?.name}
              brand={brand}
            />
          ))
        ) : (
          <p className="">
              We have not found brands available for this category.
          </p>
        )}
      </div>
      {/* <div className="w-full my-3 px-3 flex justify-start items-start">
        <Button variant="outline" onClick={() => setFirst(1000)}>
          <p className="text-base leading-[1rem]">View All</p>
        </Button>
      </div> */}
    </section>
  );
};

export default BrandCategory;
