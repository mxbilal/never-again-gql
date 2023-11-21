import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

import { PeopleCardProps } from "@/types";
import { getCategoryTitle } from "@/utils/getCategoryTitle";
import { getPeopleTypeImage } from "@/utils/getPeopleTypeImage";

const PeopleCard: React.FC<PeopleCardProps> = ({ variant, handleClick,  category }) => {
  const title = getCategoryTitle("people", variant);
  const imageSrc = getPeopleTypeImage(variant);

  return (
    <div className="w-full">
      <Card className="w-full flex flex-col justify-center md:justify-between items-center py-4 mb-4">
        <img
          src={imageSrc}
          alt="Public figure category"
          className="mx-[0.75rem] w-[12.5rem] mb-4"
        />
        <CardTitle className="mx-20 my-2">{title}</CardTitle>
        <Button
          className="mx-[0.75rem]"
          variant="outline"
          onClick={() => handleClick(category)}
        >
          <p className="text-base">Explore</p>
        </Button>
      </Card>
    </div>
  );
};

export default PeopleCard;
