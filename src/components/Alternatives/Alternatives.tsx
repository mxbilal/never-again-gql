import React, { useState } from "react";
import Paginator from "@/components/Paginator";
import ApprovedBrandCard from "../ApprovedBrandCard/ApprovedBrandCard";

const imageSrc =
  "https://png.pngtree.com/png-clipart/20220228/original/pngtree-icc-cricket-world-cup-trophy-realistic-3d-design-png-image_7323759.png";

const Alternatives = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const count = 18; // hardcoded, to be changed

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleBrands = data.slice(startIndex, endIndex);
  return (
    <div>
      <div className="w-full mb-4 flex justify-between items-start">
        <h3>Alternative Approved Brands</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {visibleBrands.map((brandData) => (
          <div key={brandData.id}>
            <ApprovedBrandCard
              imageSrc={imageSrc}
              brandTitle={brandData.name}
              brand={{ id: brandData.id, name: brandData.name }}
            />
          </div>
        ))}
      </div>
      <div className="w-full my-3 px-3 flex justify-end items-center">
        <Paginator
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Alternatives;
