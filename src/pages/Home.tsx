import Search from "@/components/Search";
import BrandCard from "@/components/BrandCard/BrandCard";
import { Button } from "@/components/ui/button";

import Loader from "@/components/Loader";
import { useBrands, getBrandCount } from "@/api/hooks";
import { useState, useEffect } from "react";
import Paginator from "@/components/Paginator";

const Home = () => {
  const itemsPerPage = 50;
  const [value, setValue] = useState("");
  const [first, setFirst] = useState(itemsPerPage);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let { countLoading, countError, countData } = getBrandCount();
  let { loading, error, data, refetch } = useBrands({
    orderBy: "createdAt_DESC",
    value: "",
    first,
    skip: 0,
  });
  function debounce() {
    let timer;
    return (args) => {
      console.log("args", args);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setValue(args);
        setBrands([]);
        refetch({ value: args, first: 10, skip: 0 });
      }, 1000);
    };
  }
  const handleSearch = () => {
    // setValue(value)
    return debounce(value);
  };
  // useEffect(() => {
  //   refetch({ value: "", first });
  // }, [first]);
  useEffect(() => {
    if (data?.brands) {
      if (value) {
        setBrands([...data?.brands]);
      } else {
        setBrands([...brands, ...data?.brands]);
      }
    }
  }, [data?.brands]);

  async function getAllBrands() {
    //page -1 * 20
    setBrands([]);
    setValue("");
    await refetch({
      first: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
      value: "",
    });
    // if (countData?.brandsConnection?.aggregate?.count >= 100) {
    //   for (
    //     let i = 0;
    //     i < Math.ceil(countData?.brandsConnection?.aggregate?.count / 100);
    //     i++
    //   ) {
    //     await refetch({ first: 100, skip: i * 100, value: "" });
    //   }
    // } else {
    //   await refetch({ first: 100, skip: 0, value: "" });
    // }
  }

  useEffect(() => {
    getAllBrands();
  }, [currentPage]);

  if (loading) {
    return <Loader />;
  }
  if (error) return <p>Error : {error.message}</p>;
  const { count } = countData?.brandsConnection?.aggregate || { count: 0 };
  const handlePageChange = (newPage: number) => {
    // Handle any logic you want when the page changes
    setCurrentPage(newPage);
    // Fetch new data, update the state, etc.
  };
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
        {/* <Button variant="outline" onClick={() => getAllBrands()}>
          <p className="text-base">View All</p>
        </Button> */}
        <Paginator
          totalItems={count}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div
        className="w-full flex flex-col flex-nowrap justify-center items-center"
        id="brandCards"
      >
        {brands?.map?.((brand: any) => {
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
