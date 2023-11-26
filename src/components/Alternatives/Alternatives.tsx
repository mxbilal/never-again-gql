import React, { useState } from "react";
import Paginator from "@/components/Paginator";
import ApprovedBrandCard from "../ApprovedBrandCard/ApprovedBrandCard";

const Alternatives = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const count = 18; // hardcoded, to be changed

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const dummyData = [
    {
      id: "1",
      name: "Brand 1",
      imageSrc:
        "https://png.pngtree.com/png-clipart/20220228/original/pngtree-icc-cricket-world-cup-trophy-realistic-3d-design-png-image_7323759.png",
      brandTitle: "Brand Title 1",
    },
    {
      id: "2",
      name: "Brand 2",
      imageSrc:
        "https://png.pngtree.com/png-clipart/20220228/original/pngtree-icc-cricket-world-cup-trophy-realistic-3d-design-png-image_7323759.png",
      brandTitle: "Brand Title 2",
    },
    {
      id: "3",
      name: "Brand 3",
      imageSrc:
        "https://png.pngtree.com/png-clipart/20220228/original/pngtree-icc-cricket-world-cup-trophy-realistic-3d-design-png-image_7323759.png",
      brandTitle: "Brand Title 3",
    },
    {
      id: "4",
      name: "Brand 4",
      imageSrc: "https://example.com/brand4-image.png",
      brandTitle: "Brand Title 4",
    },
    {
      id: "5",
      name: "Brand 5",
      imageSrc: "https://example.com/brand5-image.png",
      brandTitle: "Brand Title 5",
    },
    {
      id: "6",
      name: "Brand 6",
      imageSrc: "https://example.com/brand6-image.png",
      brandTitle: "Brand Title 6",
    },
    {
      id: "7",
      name: "Brand 7",
      imageSrc: "https://example.com/brand7-image.png",
      brandTitle: "Brand Title 7",
    },
    {
      id: "8",
      name: "Brand 8",
      imageSrc: "https://example.com/brand8-image.png",
      brandTitle: "Brand Title 8",
    },
    {
      id: "9",
      name: "Brand 9",
      imageSrc: "https://example.com/brand9-image.png",
      brandTitle: "Brand Title 9",
    },
  ];

  return (
    <div>
      <div className="w-full mb-4 flex justify-between items-start">
        <h3>Alternative Approved Brands</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {dummyData.map((brandData) => (
          <div key={brandData.id}>
            <ApprovedBrandCard
              imageSrc={brandData.imageSrc}
              brandTitle={brandData.brandTitle}
              brand={{ id: brandData.id, name: brandData.name }}
            />
          </div>
        ))}
      </div>
      <div className="w-full my-3 px-3 flex justify-end items-center">
        <Paginator
          totalItems={count}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Alternatives;
