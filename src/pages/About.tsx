import React from "react";

import Ayat from "@/components/Ayat";
import mpTracker from '../lib/mixpanel';

const About = () => {
  const trackLinkClick = (tag) => {
    mpTracker.track(`About - Link - ${tag}`);
  };
  return (
    <>
      <section className="px-3 md:px-0 w-full flex flex-col justify-center items-center my-12 md:mx-0">
        <div className="w-full">
          <h2>Question</h2>
          <p className="mb-4">
            How many bombs are required for us to realise that as Muslims - they
            will never be our friends. Never. Ever. They might be colleagues,
            associates, business partners - but ultimately, they are not our
            friends..
          </p>
          <Ayat />
          <h2 className="mt-4">Never Again</h2>
          <p>
            Welcome to Never Again, your trusted source for truth in the fight
            against Islamophobia, Muslim oppression. We are a dedicated
            directory, meticulously curated to empower you with accurate
            information on companies endorsing Islamophobia, supporting
            apartheid regimes, supporting racism and perpetuating discrimination
            against Muslims (and ALL).
          </p>
          <br />
          <h2>What We Do:</h2>
          <p>
            Never Again serves as your comprehensive directory, listing
            businesses and organisations that support apartheid and engage in
            Islamophobia or Muslim oppression. Our mission is to provide you
            with factual, reliable information, enabling you to make
            conscientious choices and participate in responsible consumer
            activism.
          </p>
          <br />
          <h3>Get Involved:</h3>
          <p>
            Join our community, share your insights, and contribute to our
            database. Help us expand our directory by submitting companies and
            organizations supporting apartheid or engaging in Islamophobia at{" "}
            <a onClick={() => trackLinkClick('Email')} href="mailto:salam@neveragain.app">salam@neveragain.app</a>
          </p>
          <br />
          <p>
            Thank you for being part of the Never Again movement. Together, we
            can stand against discrimination and create a world where businesses
            are held accountable for their actions.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
