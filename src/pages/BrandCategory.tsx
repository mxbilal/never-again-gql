import Search from "@/components/Search";
import BrandCard from "@/components/BrandCard/BrandCard";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { exploreCategories } from "@/api/hooks";
import Loader from "@/components/Loader";

const BrandCategory = () => {
  const { name } = useParams();
  const [value, setValue] = useState("");
  const [first, setFirst] = useState(10);
  let { loading, error, data, refetch } = exploreCategories(name, "", first);
  useEffect(() => {
    console.log("view all");
    refetch({ value: "", first });
  }, [first]);
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
        className="w-full my-3 px-3 flex justify-between items-center"
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
        {data &&
          data.brands.map((brand) => (
            <BrandCard
              imageSrc={brand?.icon?.url}
              brandTitle={brand?.name}
              brand={brand}
            />
          ))}
      </div>
      {/* <div className="w-full my-3 px-3 flex justify-start items-start">
        <Button variant="outline" onClick={() => setFirst(1000)}>
          <p className="text-base">View All</p>
        </Button>
      </div> */}
    </section>
  );
};

export default BrandCategory;
