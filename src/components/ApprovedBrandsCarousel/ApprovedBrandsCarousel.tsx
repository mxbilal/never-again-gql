import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ApprovedBrandCard from "../ApprovedBrandCard/ApprovedBrandCard";

const ApprovedBrandsCarousel = () => {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="content text-center mb-10">
      <div className="container mx-auto">
        <Slider {...settings}>
          {dummyData.map((brandData) => (
            <ApprovedBrandCard
              imageSrc={brandData.imageSrc}
              brandTitle={brandData.brandTitle}
              brand={{ id: brandData.id, name: brandData.name }}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ApprovedBrandsCarousel;
