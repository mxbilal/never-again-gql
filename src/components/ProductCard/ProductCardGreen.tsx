import React from "react";
import { Card, CardTitle } from "@/components/ui/card-green";
import { ProductCardProps } from "@/types";

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  productTitle,
  brandTitle,
}) => {
  return (
    <div className="w-full">
      <Card className="w-full flex flex-col justify-center items-center md:grid md:grid-cols-12 py-3 px-3 min-h-[9.375rem]">
        <div className="col-span-2 md:col-span-2 group">
          <img
            className="mx-auto md:mx-[1.528rem] max-w-[12.5rem] w-full"
            src={imageSrc}
            alt="Product Image"
          />
        </div>
        <CardTitle className="my-4 md:my-0 col-span-8 md:col-span-8 mx-4 md:mx-20 text-center">
          {productTitle}
        </CardTitle>
        <div className="flex justify-center col-span-2 md:col-span-2">
          <CardTitle className="my-4 md:my-0 col-span-8 md:col-span-8 mx-4 md:mx-20 text-center">
            {brandTitle}
          </CardTitle>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
