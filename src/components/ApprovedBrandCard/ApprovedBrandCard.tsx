import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ApprovedBrandCardProps } from "@/types";

import mpTracker from '../../lib/mixpanel';

const ApprovedBrandCard: React.FC<ApprovedBrandCardProps> = ({
  imageSrc,
  brandTitle,
  brand,
}) => {
  const navigate = useNavigate();

  const basePath = "/approved-brands";

  const handleBrandClick = () => {
    const slugifiedName = slugify(brand?.name, { lower: true });
    mpTracker.track('Approved - Brandcard - Link - ' + brand?.name);
    navigate(`${basePath}/${slugifiedName}`, {
      state: { id: brand?.id, name: brand?.name },
    });
  };

  return (
    <div className="w-full">
      <Card className="w-full flex flex-col justify-center items-center py-3 px-3 mb-2">
        <div className="p-12 flex justify-center items-center lg:min-h-[9.375rem] lg:h-[20rem]">
          <img
            className="mx-auto md:mx-[1.528rem] w-full"
            src={imageSrc}
            alt="Brand Image"
          />
        </div>
        <CardTitle className="my-4 md:my-0 col-span-8 md:col-span-8 mx-4 md:mx-20 text-center">
          {brandTitle}
        </CardTitle>
        <CardContent className="my-4 md:my-0 mx-4 md:mx-20 text-center flex flex-col h-[4rem]">
          <Button
            className="my-4"
            variant="outline"
            onClick={() => handleBrandClick()}
          >
            <p className="text-base leading-[1rem]">View More</p>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovedBrandCard;
