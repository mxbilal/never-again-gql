import { useState, useEffect } from "react";
import { useApprovedBrands, getApprovedBrandCount } from "@/api/hooks";
import Paginator from "@/components/Paginator";
import BrandCard from "@/components/BrandCard";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

const ApprovedBrands = () => {
  const itemsPerPage = 50;
  const [value, setValue] = useState("");
  const [paginationVisible, setPaginationVisible] = useState(true);
  const [first, setFirst] = useState(itemsPerPage);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let { countLoading, countError, countData } = getApprovedBrandCount();

  let { loading, error, data, refetch } = useApprovedBrands({
    orderBy: "createdAt_DESC",
    value: "",
    first,
    skip: 0,
  });

  useEffect(() => {
    if (data?.approvedBrands) {
      if (value) {
        setBrands([...data?.approvedBrands]);
      } else {
        setBrands([...brands, ...data?.approvedBrands]);
      }
    }
  }, [data?.approvedBrands]);

  async function getAllPageBrands() {
    setBrands([]);
    setValue("");
    await refetch({
      first: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
      value: "",
    });
  }

  async function getAllBrands() {
    setPaginationVisible(false);
    setBrands([]);
    setValue("");
    if (countData?.approvedBrandsConnection?.aggregate?.count >= 100) {
      for (
        let i = 0;
        i <
        Math.ceil(countData?.approvedBrandsConnection?.aggregate?.count / 100);
        i++
      ) {
        await refetch({ first: 100, skip: i * 100, value: "" });
      }
    } else {
      await refetch({ first: 100, skip: 0, value: "" });
    }
  }

  useEffect(() => {
    getAllPageBrands();
  }, [currentPage]);

  if (loading) {
    return <Loader />;
  }

  if (error) return <p>Error : {error.message}</p>;

  const { count } = countData?.approvedBrandsConnection?.aggregate || {
    count: 0,
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <section className="w-full px-3 md:px-0 my-12 flex flex-col justify-center items-center">
        <div
          className="w-full mb-4 px-3 flex justify-between items-start"
          id="latestBrands"
        >
          <h3>Approved Brands</h3>
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
                isApproved={true}
              />
            );
          })}
        </div>
        {paginationVisible && (
          <div className="w-full my-3 flex justify-between items-center">
            <Button variant="outline" onClick={() => getAllBrands()}>
              <p className="text-base leading-[1rem]">View All</p>
            </Button>
            <Paginator
              totalItems={count}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default ApprovedBrands;
