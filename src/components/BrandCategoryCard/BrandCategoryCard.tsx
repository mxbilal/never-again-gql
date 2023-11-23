import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

import { BrandCategoryCardProps } from "@/types";
import { getCategoryTitle } from "@/utils/getCategoryTitle";
import { getBrandCategoryIcon } from "@/utils/getBrandCategoryIcon";

const BrandCategoryCard: React.FC<BrandCategoryCardProps> = ({ variant }) => {
  const navigate = useNavigate();

  const title = getCategoryTitle("brand", variant);
  const categoryIcon = getBrandCategoryIcon(variant);

  const handleBrandCategoryClick = () => {
    navigate(`/categories/${title.toLocaleLowerCase()}`, { state: { name: title } });
  };

  return (
    <div className="w-full">
      <Card className="w-full flex flex-col justify-center md:justify-between items-center p-4">
        <div className="mb-2">
          <i className={categoryIcon}></i>
        </div>
        <CardTitle className="mx-20 mb-2">{title}</CardTitle>
        <Button
          className="mx-[0.75rem]"
          variant="outline"
          onClick={() => handleBrandCategoryClick()}
        >
          <p className="text-base">Explore</p>
        </Button>
      </Card>
    </div>
  );
};

export default BrandCategoryCard;
