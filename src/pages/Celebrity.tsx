import { useLocation, useParams } from "react-router-dom";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Socials from "@/components/Socials";
import { getCelebrity } from "@/api/hooks";
import Loader from "@/components/Loader";

import Generic from "../assets/images/generic-profile-pic.jpg";

const Celebrity = () => {
  const location = useLocation();
  const { id } = location.state;

  const { loading, error, data } = getCelebrity({ id });

  if (loading) {
    return <Loader />;
  }

  if (error) return <p>Error : {error.message}</p>;

  console.log("in Celebrity, data", data);

  return (
    <section className="w-full flex flex-col justify-center items-start my-12 md:flex-row-reverse md:mx-0">
      <div className="w-full md:w-1/3 h-full">
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <div className="w-full">
            <img
              className="mx-auto max-w-[12.5rem] w-full rounded-full transition-transform duration-300 transform group-hover:rounded-none"
              src={data?.people?.profileUrl ?? Generic}
              alt="Celebrity Image"
            />
          </div>
          <div className="hidden md:flex justify-center items-center mt-4">
            <Button className="mx-[0.75rem] group" variant="outline">
              <a href={data?.people?.proofLinks} target="blank">
                {" "}
                <p className="text-base group-hover:text-neverLime">Proof</p>
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center mt-2 text-center">
            <CardDescription className="w-full">
              Unfollow at the following platforms:
            </CardDescription>
            <Socials />
          </div>
        </Card>
      </div>
      <div className="w-full md:w-2/3">
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <div className="w-full flex justify-between">
            <CardTitle className="w-full">{data?.people?.name}</CardTitle>
            <Badge className="flex justify-center" variant="outline">
              Celebrity
            </Badge>
          </div>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardDescription className="w-full">
            {data?.people?.detail}
          </CardDescription>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardDescription className="w-full">
            <b>Born:</b> {data?.people?.dateOfBirth} <br />
            <b>Height:</b> {data?.people?.height}
          </CardDescription>
        </Card>
        <Card className="w-full flex flex-col justify-center items-center p-6">
          <CardDescription className="w-full">
            {data?.people?.description}
          </CardDescription>
        </Card>
        <div className="md:hidden flex justify-center items-center mt-4">
          <Button className="mx-[0.75rem] group" variant="outline">
            <a href={data?.people?.proofLinks} target="blank">
              {" "}
              <p className="text-base group-hover:text-neverLime">Proof</p>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Celebrity;
