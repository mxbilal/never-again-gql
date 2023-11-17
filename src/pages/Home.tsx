import Search from "@/components/Search";
import BrandCard from "@/components/BrandCard/BrandCard";
import { Button } from "@/components/ui/button";

// import Yves from "../assets/images/yves-saint-laurent-logo.svg";
// import Yum from "../assets/images/yum-logo.svg";
// import Wix from "../assets/images/wix-logo.svg";
// import Wells from "../assets/images/wells-fargo-logo.svg";
// import Waze from "../assets/images/waze-logo.svg";
// import Walmart from "../assets/images/walmart-logo.svg";
// import Walls from "../assets/images//walls-logo.svg";
// import Walkers from "../assets/images/walkers-logo.svg";
// import Volvo from "../assets/images/volvo-logo.jpg";
// import Vittel from "../assets/images/vittel-logo.svg";
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
    console.log("rr");
    refetch({ value: "", first });
  }, [first]);
  // useEffect(() => {
  //   if (value.length > 2 && refetch) refetch({ value });
  // }, [value]);

  if (loading) return <p>Loading...</p>;
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
        {
          data?.brands?.map?.((brand) => {
            return (
              <BrandCard
                imageSrc={brand?.icon?.url}
                brandTitle={brand?.name}
                brand={brand}
              />
            );
          })
          /* <BrandCard
          imageSrc={Yves}
          brandTitle="Yves Saint Laurent / YSL Beauty"
        />
        <BrandCard imageSrc={Yum} brandTitle="Yum Foods"  />
        <BrandCard imageSrc={Wix} brandTitle="Wix" />
        <BrandCard imageSrc={Wells} brandTitle="Wells Fargo" />
        <BrandCard imageSrc={Waze} brandTitle="Waze" />
        <BrandCard imageSrc={Walmart} brandTitle="Walmart" />
        <BrandCard imageSrc={Walls} brandTitle="Walls Ice Creams" />
        <BrandCard imageSrc={Walkers} brandTitle="Walker's" />
        <BrandCard imageSrc={Volvo} brandTitle="Volvo Heavy Machinery" />
        <BrandCard imageSrc={Vittel} brandTitle="Vittel" /> */
        }
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
