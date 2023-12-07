import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

import { CorporationCardProps } from "@/types";
import mpTracker from '../../lib/mixpanel';


const CorporationCard: React.FC<CorporationCardProps> = ({
  imageSrc,
  corporationTitle,
  corporation,
}) => {
  const navigate = useNavigate();
  // all the companies and brands of that corporation should show, use slgify instead of lowercase
  const handleCorporationClick = () => {
    mpTracker.track('Categories - Link Corporation - ' + corporation?.name);
    navigate(
      `/categories/corporations/${corporation?.name.toLocaleLowerCase()}`,
      {
        state: { id: corporation.id, name: corporation?.name },
      }
    );
  };
  return (
    <div className="w-full">
      <Card className="w-full flex flex-col justify-center md:justify-between items-center py-4 mb-4">
        <img
          src={imageSrc}
          alt="Corporation logo"
          className="mx-[0.75rem] w-[12.5rem] mb-4"
        />
        <CardTitle className="text-center mx-20 my-2">
          {corporationTitle}
        </CardTitle>
        <Button
          className="mx-[0.75rem]"
          variant="outline"
          onClick={() => handleCorporationClick()}
        >
          <p className="text-base">Explore</p>
        </Button>
      </Card>
    </div>
  );
};

export default CorporationCard;
