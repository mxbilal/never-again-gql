import { useLocation } from "react-router-dom";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/Loader";

import mpTracker from '../lib/mixpanel';

import { approvedBrandDetails } from "@/api/hooks";

const ApprovedBrand = () => {

  const trackLinkClick = (tag) => {
    mpTracker.track(`Approved Brand - Link - Shop - ${tag}`);
  };
  
  const location = useLocation();
  const { id } = location.state;
  let { loading, error, data } = approvedBrandDetails({ id });

  if (loading) {
    return <Loader />;
  }
  if (error) return <p>Error : {error.message}</p>;

  const { approvedBrand } = data;

  return (
    <section className="w-full flex flex-col justify-center items-center my-12 md:mx-0">
      <div className="px-3 md:px-0 w-full">
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <div className="w-full relative">
            <i
              className="fa-solid fa-check absolute bottom-0 right-0"
              style={{ fontSize: "50px", color: "#bfff00" }}
            />
            <img
              className="mx-auto max-w-[12.5rem] w-full"
              src={approvedBrand?.icon?.url}
              alt="Brand Image"
            />
          </div>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardTitle className="w-full">{approvedBrand?.name}</CardTitle>
          <CardDescription className="w-full">
            {approvedBrand?.descriptionSmall}
          </CardDescription>
        </Card>
        <Card className="w-full p-6">
          <div className="flex flex-wrap">
            {approvedBrand.linking.map((ct: any) => (
              <div key={ct.name} className="flex" style={{ gap: "3px" }}>
                <Badge className="flex items-center" variant="outline">
                  {ct.name}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardDescription className="w-full">
            {approvedBrand?.description}
          </CardDescription>
        </Card>
        {approvedBrand?.instructions && (
          <Card className="w-full flex flex-col justify-center items-center p-6">
            <CardDescription className="w-full">
              {approvedBrand.instructions}
            </CardDescription>
          </Card>
        )}
        <div className="flex justify-center items-center mt-4">
          <Button className="mx-[0.75rem] group" variant="outline">
            <a onClick={() => trackLinkClick(approvedBrand?.name)} href={approvedBrand?.shopLink} target="_blank">
              {" "}
              <p className="text-base group-hover:text-neverLime">Shop Now</p>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ApprovedBrand;
