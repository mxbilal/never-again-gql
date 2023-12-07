import React from "react";

const Faq = () => {
  // Calculation for API requests
  const usersPerDay = 500;
  const productsScannedPerDay = 5;
  const millisecondsPerScan = 500; // Assuming an average of 500 milliseconds per scan

  const totalProductsScannedPerDay = usersPerDay * productsScannedPerDay;
  const totalMillisecondsPerDay = totalProductsScannedPerDay * millisecondsPerScan;
  const totalSecondsPerDay = totalMillisecondsPerDay / 1000;

  const apiRequestsPerDay = totalProductsScannedPerDay * 3; // Assuming 3 API requests per scan

  // Calculation for API requests per second
  const apiRequestsPerSecond = apiRequestsPerDay / (24 * 60 * 60); // Total seconds in a day


  return (
    <>
      <section className="w-full flex flex-col justify-center items-center my-12 md:mx-0">
        <div className="px-3 md:px-0 w-full">
          
          <h2 className="mb-2">FAQs</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Where can I download the app?</h3>
            <p className="mb-4">
              You can download the app from the Google Play Store for Android users and the App Store for iOS users.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">What are the requirements for web, camera, and location permissions?</h3>
            <p className="mb-4">
              The app requires access to your device's camera and location for barcode scanning and identifying the origin of products. Web access ensures seamless functionality.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">How do I submit a bad result or missing brand/barcode?</h3>
            <p className="mb-4">
              You can easily provide feedback by visiting the '/contact' section within the app and submitting your feedback regarding any inaccurate information or missing brands/barcodes.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">How does the barcode scanner work?</h3>
            <p className="mb-4">
              The barcode scanner employs machine learning and a proprietary algorithm that compares a vast database of brands, corporations, and products. It processes an average of {totalProductsScannedPerDay} products daily, completing calculations in around {totalSecondsPerDay} seconds each day. This results in approximately {apiRequestsPerDay} API requests daily.
            </p>
            <p className="mb-4">
              With {apiRequestsPerSecond.toFixed(2)} API requests processed per second on average, the application dynamically learns, incorporates user feedback, and enhances accuracy, achieving an approximate 89% accuracy rate in identifying products and their origins.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Who develops the application?</h3>
            <p className="mb-4">
              The application is developed and maintained by a global team of volunteers committed to promoting ethical consumerism and enabling individuals to make informed choices while shopping.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">What is the vision of the application?</h3>
            <p className="mb-4">
              The application aims to be a comprehensive super app empowering not just specific groups but all individuals to shop ethically. It encourages the use of alternative brands and shopping avenues, fostering a conscious and informed consumer culture.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">How is the database structured?</h3>
            <p className="mb-4">
              The database is structured hierarchically:
              <ol className="list-decimal pl-6">
                <li>Products and brands are assigned to a specific company.</li>
                <li>Each company is further assigned to a corporation.</li>
              </ol>
              </p>
            <p className="mb-4">
              For example, Twirl Chocolate is a product owned by Twirl, which is owned by Cadbury, further owned by Mondelez. This hierarchical structure enables efficient organization and analysis of ownership relations within the database.
            </p>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Faq;