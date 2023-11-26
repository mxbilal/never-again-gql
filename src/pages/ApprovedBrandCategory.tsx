import BrandCard from "@/components/BrandCard/BrandCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { exploreCategories } from "@/api/hooks";
import Loader from "@/components/Loader";

const ApprovedBrandCategory = () => {
  const [value, setValue] = useState("");
  const [first, setFirst] = useState(10);
  const location = useLocation();
  const { name } = location.state;
  let { loading, error, data, refetch } = exploreCategories(name, "", first);

  useEffect(() => {
    refetch({ value: "", first });
  }, [first]);

  if (loading) {
    return <Loader />;
  }
  if (error) return <p>Error : {error.message}</p>;
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div
        className="px-3 md:px-0 my-12 w-full flex flex-col flex-nowrap justify-center items-center"
        id="brandCards"
      >
        {data &&
          data.brands.map((brand) => (
            <BrandCard
              key={brand?.id}
              imageSrc={brand?.icon?.url}
              brandTitle={brand?.name}
              brand={brand}
              isApproved={true}
            />
          ))}
      </div>
    </section>
  );
};

export default ApprovedBrandCategory;
