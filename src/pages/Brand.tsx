import { useLocation, Link } from "react-router-dom";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/Loader";
import mpTracker from '../lib/mixpanel';

import { brandDetails } from "@/api/hooks";
import Alternatives from "@/components/Alternatives";

const Brand = () => {

  const trackLinkClick = (tag) => {
    mpTracker.track(`Brand - Link - Proof - ${tag}`);
  };

  const location = useLocation();
  const { id } = location.state;
  let { loading, error, data } = brandDetails({ id });
  if (loading) {
    return <Loader />;
  }
  if (error) return <p>Error : {error.message}</p>;
  const { brand } = data;

  return (
    <section className="w-full flex flex-col justify-center items-center my-12 md:mx-0">
      <div className="px-3 md:px-0 w-full">
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <div className="w-full relative">
            <img
              className="mx-auto max-w-[12.5rem] w-full"
              src={brand?.icon?.url}
              alt="Brand Image"
            />
          </div>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardTitle className="w-full">{brand?.name}</CardTitle>
          <CardDescription className="w-full">
            {brand?.descriptionSmall}
          </CardDescription>
        </Card>
        <Card className="w-full p-6">
          <div className="flex flex-wrap">
          {brand.linking.map((ct: any) => (
              <div key={ct.name} style={{ display: "flex", gap: "3px" }}>
                <Badge className="flex justify-start" variant="outline">
                {ct.name}
                </Badge>
              </div>
            ))}
          </div>
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
        {/* ADD LOGIC HERE TO RENDER THE FOLLOWING CARD IF THERE ARE NO ALTERNATIVE BRANDS FOUND FROM THE QUERY, AFSHAL  */
        
        !brand?.alternativeLinks?.length &&  (<Card className="w-full flex flex-col justify-center items-center p-6">
          <CardDescription className="w-full">
            Alternatives
            <br />
            No alternatives researched yet. Help us out!
          </CardDescription>
        </Card>)
        
        }

        {/* ADD LOGIC HERE TO RENDER THE FOLLOWING CARD IF ALTERNATIVE BRANDS FOUND FROM THE QUERY, AFSHAL  */
        
        brand?.alternativeLinks?.length > 0 && (<Card className="w-full flex flex-col justify-center items-center p-6">
            <div>
              {/* some change required here, so the data of the alternative brand is either sent as prop or queried directly inside the Alternatives component */}
              <Alternatives data={brand?.alternativeLinks ?? []} />
            </div>
          </Card>)
        
        }
        {brand?.proofLinks ? (
        <div className="flex justify-center items-center mt-4">
          <Button className="mx-[0.75rem] group" variant="outline">
            <a onClick={() => trackLinkClick(brand?.name)} href={brand?.proofLinks} target="blank">
              {" "}
              <p className="text-base group-hover:text-neverLime">Proof</p>
            </a>
          </Button>
        </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Brand;
