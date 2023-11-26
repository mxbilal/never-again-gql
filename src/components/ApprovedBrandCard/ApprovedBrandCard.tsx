import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ApprovedBrandCardProps } from "@/types";

const ApprovedBrandCard: React.FC<ApprovedBrandCardProps> = ({
  imageSrc,
  brandTitle,
  brand,
}) => {
  const navigate = useNavigate();

  const basePath = "/approved-brands";

  const handleBrandClick = () => {
    const slugifiedName = slugify(brand?.name, { lower: true });
    navigate(`${basePath}/${slugifiedName}`, {
      state: { id: brand?.id, name: brand?.name },
    });
  };

  return (
    <div className="w-full">
      <Card className="w-full flex flex-col justify-center items-center py-3 px-3 mb-2 min-h-[9.375rem]">
        <div className="group">
          <img
            className="mx-auto md:mx-[1.528rem] max-w-[12.5rem] w-full"
            src={imageSrc}
            alt="Brand Image"
          />
        </div>
        <CardContent className="my-4 md:my-0 mx-4 md:mx-20 text-center">
          {brandTitle}
          <Button
            className="mx-[0.75rem]"
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
