import React from "react";

const Contact = () => {
  return (
    <>
      <section className="px-3 md:px-0 w-full flex flex-col justify-center items-center my-12 md:mx-0">
        <div className="w-full">
          <h2 className="mb-5">Contact Us</h2>
          <p className="mb-5">
            For feedback, questions, or to report a missing barcode, please email us at {"salam@neveragain.app"}.
          </p>
          <p className="mb-5">
            Before reporting data, please note that all scanning errors are tracked as anomalies.
          </p>
          <p className="mb-5">
            We track and record all scanning errors, using this data to enhance our scanning accuracy through our machine learning model.
          </p>
        </div>
      </section>
    </>
  );
};

export default Contact;
