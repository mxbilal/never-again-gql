import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { PublicFigureCardProps } from "@/types";

import mpTracker from '../../lib/mixpanel';

// this component is for individuals listed in eiter celebrities or politicans, not the final level

const PublicFigureCard: React.FC<PublicFigureCardProps> = ({
  name,
  variant,
  imageUrl,
  people,
}) => {
  const navigate = useNavigate();

  const handlePublicFigureClick = (publicFigureSlug: object, title: string) => {
    const { id, name, peopleCategory } = publicFigureSlug;
    const slugifiedName = slugify(name, { lower: true });

    if (peopleCategory?.title === "Politicians") {
      mpTracker.track('Politicians - People - Link - ' + title);
      navigate(`/categories/politicians/${slugifiedName}`, {
        state: { id, name },
      });
    } else {
      mpTracker.track('Celebrities - People - Link - ' + title);
      navigate(`/categories/celebrities/${slugifiedName}`, {
        state: { id, name },
      });
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full flex flex-col justify-center md:justify-between items-center p-4">
        <div className="mb-2 flex justify-center">
          <img
            src={imageUrl}
            alt="Public figure image"
            className="mx-[0.75rem] md:max-h-[318px]"
          />
        </div>
        <CardTitle className="text-center mx-20 mb-2">{name}</CardTitle>
        
        <Button
          className="mx-[0.75rem]"
          variant="outline"
          onClick={() => handlePublicFigureClick(people, name)}
        >
          <p className="text-base">Explore</p>
        </Button>
      </Card>
    </div>
  );
};

export default PublicFigureCard;
