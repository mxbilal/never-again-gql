import BrandCard from "@/components/BrandCard/BrandCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { exploreApprovedCategories } from "@/api/hooks";
import Loader from "@/components/Loader";

const ApprovedBrandCategory = () => {
  const [value, setValue] = useState("");
  const [first, setFirst] = useState(10);
  const location = useLocation();
  const { name, id } = location.state;

  let { loading, error, data, refetch } = exploreApprovedCategories(id);

  useEffect(() => {
    refetch({ value: "", first });
  }, [first]);

  if (data) {
    console.log("Data received from API:", data);
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error : {error.message}</p>;
  }

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div
        className="px-3 md:px-0 my-12 w-full flex flex-col flex-nowrap justify-center items-center"
        id="brandCards"
      >
        {data && data.category && data.category.approvedBrands && data.category.approvedBrands.length > 0 ? (
          data.category.approvedBrands.map((brand) => (
            <BrandCard
              key={brand?.id}
              imageSrc={brand?.icon?.url}
              brandTitle={brand?.name}
              brand={brand}
              isApproved={true}
            />
          ))
        ) : (
          <p className="">
            We have not found brands available for this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default ApprovedBrandCategory;
