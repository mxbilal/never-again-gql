import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Hyundai from "../assets/images/hyundai-logo.jpg";
import { brandDetails } from "@/api/hooks";

// only hyundai here for now

const Brand = () => {
  const { name } = useParams();
  // const lastPartOfSlug = (slug?.split("/").pop() || "").trim();
  console.log("lastPartOfSlug", name);
  let { loading, error, data } = brandDetails({ id: name });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const { brand } = data;
  return (
    <section className="w-full flex flex-col justify-center items-center my-12 md:mx-0">
      <div className="w-full">
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <div className="w-full">
            <img
              className="mx-auto max-w-[12.5rem] w-full rounded-full transition-transform duration-300 transform group-hover:rounded-none"
              src={brand?.icon?.url}
              alt="Brand Image"
            />
          </div>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <div className="w-full flex justify-between">
            <CardTitle className="w-full">{brand?.name}</CardTitle>
            {brand.linking.map((ct) => (
              <div style={{ display: "flex", gap: "3px" }}>
                <Badge className="flex justify-center" variant="outline">
                  {ct.name}
                </Badge>
              </div>
            ))}
          </div>
          <CardDescription className="w-full">
            {brand?.descriptionSmall}
          </CardDescription>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardDescription className="w-full">
            {brand?.description}
          </CardDescription>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardDescription className="w-full">
            {brand?.instructions}
          </CardDescription>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardDescription className="w-full">
            Alternatives
            <br />
            No alternatives researched yet. Help us out!
          </CardDescription>
        </Card>
        <div className="flex justify-center items-center mt-4">
          <Button className="mx-[0.75rem]" variant="outline">
            <a href={brand?.proofLinks} target="blank">
              {" "}
              <p className="text-base">Proof</p>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Brand;
