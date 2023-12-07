import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { BrandCardProps } from "@/types";
import mpTracker from '../../lib/mixpanel';

const BrandCard: React.FC<BrandCardProps> = ({
  imageSrc,
  brandTitle,
  brand,
  isApproved = false,
}) => {
  const navigate = useNavigate();

  const basePath = isApproved ? "/approved-brands" : "/categories/brands";

  const handleBrandClick = () => {

    const slugifiedName = slugify(brand?.name, { lower: true });
    if (isApproved) {
      mpTracker.track('Approved Brandcard - Link - ' + brand?.name);
    } else {
      mpTracker.track('Brandcard - Link - ' + brand?.name);
    }

    navigate(`${basePath}/${slugifiedName}`, {
      state: { id: brand?.id, name: brand?.name, isApproved },
    });
  };

  return (
    <div className="w-full">
      <Card className="w-full flex flex-col justify-center items-center md:grid md:grid-cols-12 py-3 px-3 mb-2 min-h-[9.375rem]">
        <div className="col-span-2 md:col-span-2 group">
          <img
            className="mx-auto md:mx-[1.528rem] max-w-[12.5rem] w-full"
            src={imageSrc}
            alt="Brand Image"
          />
        </div>
        <CardTitle className="my-4 md:my-0 col-span-8 md:col-span-8 mx-4 md:mx-20 text-center">
          {brandTitle}
        </CardTitle>
        <div className="flex justify-center col-span-2 md:col-span-2">
          <Button
            className="mx-[0.75rem]"
            variant="outline"
            onClick={() => handleBrandClick()}
          >
            <p className="text-base leading-[1rem]">View More</p>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BrandCard;
