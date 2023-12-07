import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ApprovedBrandCard from "../ApprovedBrandCard";

const ApprovedBrandsCarousel = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: data?.length > 3 ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: data?.length > 1 ? 2 : 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          autoplay: false,
        },
      },
    ],
  };

  return (
    <div className="content text-center mb-10">
      <div className="px-8 w-[300px] sm:w-[500px] md:w-[550px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] mx-auto">
        <Slider {...settings}>
          {data.map((brandData) => (
            <div key={brandData.id}>
              <ApprovedBrandCard
                imageSrc={brandData?.icon?.url}
                brandTitle={brandData.name}
                brand={{ id: brandData.id, name: brandData.name }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ApprovedBrandsCarousel;
