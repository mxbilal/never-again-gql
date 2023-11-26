import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

import { getScannedBrands } from "@/api/hooks";

import ProductCard from "@/components/ProductCard/ProductCard";
import Loader from "@/components/Loader";
import decodeBarcode from "@/utils/decodeBarcode";
import { Button } from "@/components/ui/button";

import scannerImage from "../assets/images/scanner.png";
import BrandCard from "@/components/BrandCard";

const Scan = () => {
  const [startScan, setStartScan] = useState(false);
  const [scannedNumber, setScannedNumber] = useState("");
  const [decodedProduct, setDecodedProduct] = useState(null);
  const [successfulDecode, setSuccessfulDecode] = useState(false);
  // scannedBrand is only the brand name from decoded barcode to check from the app's db
  const [scannedBrand, setScannedBrand] = useState(null);
  const [dbScanData, setDbScanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { scanLoading, scanError, scanData, refetch } = getScannedBrands({
    value: null,
  });
  // setDbScanData(scanData);
  const handleScanStartClick = () => {
    const scanSection = document.getElementById("scan-section");
    if (scanSection) {
      scanSection.scrollIntoView({ behavior: "smooth" });
    }
    setStartScan(true);
  };

  const handleScanStopClick = () => {
    setStartScan(false);
  };

  const handleReportClick = () => {
    // mail to or something similar
    console.log("report button clicked");
  };

  const fetchScannedBrands = async (scannedNumber: string) => {
    try {
      const productData = await decodeBarcode(scannedNumber);
      setDecodedProduct(productData);
      setScannedBrand(productData.brand);
      await onScannedProductDetails(productData);
      setSuccessfulDecode(true);
      return;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onNewScanResult = async (scannedNumber: string) => {
    setLoading(true);
    setScannedNumber(scannedNumber);
    await fetchScannedBrands(scannedNumber);
    // await onScannedProductDetails(scannedBrand);
    setStartScan(false);
  };

  const onScannedProductDetails = async (decodedProductBrand: any) => {
    // const { scanLoading, scanError, scanData } = await getScannedBrands(
    //   decodedProductBrand
    // );
    // setDbScanData(scanData);
    await refetch({ value: decodedProductBrand?.brand ?? decodedProductBrand?.name?.split?.(" ")?.[0] });
  };

  // const isDesktop = window.innerWidth >= 1024;
  // const facingMode = isDesktop ? "user" : "rear";

  if (loading) {
    return <Loader />;
  }

  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className="w-full flex flex-col justify-center items-center text-center my-4">
      <h2 id="scanSection">Scan Barcode/QR Code</h2>
      {startScan && (
        <div className="m-4 w-full flex justify-center items-center px-6 md:px-3">
          <QrScanner
            onDecode={(result) => onNewScanResult(result)}
            // containerStyle={{ width: "45%" }}
            onError={(error) =>
              console.log("Qr scanner error is...", error?.message)
            }
          />
        </div>
      )}
      {!startScan && (
        <img
          src={scannerImage}
          alt="Scan"
          className="flex justify-center mx-[0.75rem] w-1/5 mb-4"
        />
      )}
      <div className="flex">
        <Button
          className="mt-1 mx-[0.75rem]"
          variant="outline"
          onClick={() => handleScanStartClick()}
        >
          <p className="text-base leading-[1rem]">Start Scan</p>
        </Button>
        <Button
          className="mt-1 mx-[0.75rem]"
          variant="outline"
          onClick={() => handleScanStopClick()}
        >
          <p className="text-base leading-[1rem]">Stop Scan</p>
        </Button>
      </div>
      {successfulDecode && (
        <div className="px-3 md:px-0 mt-4 mb-2" id="results">
          <h3>Product Details</h3>
          {/* RENDER THIS DIV IF THE PRODUCT IS NOT FOUND IN THE HYGRAPH DATABASE, AFSHAL */}
            {
              !scanData?.brands?.length && (
                <div id="brandNotFound">
                  <div className="border-8 rounded-2xl border-neverLime">
                    <ProductCard
                      imageSrc={decodedProduct?.imageUrl}
                      brandTitle={decodedProduct?.brand}
                      productTitle={decodedProduct?.name}
                    />
                  </div>
                  <p className="font-bold italic">Great!</p>
                  <p>This product does not appear in the Never Again database.</p>
                </div>
              )
            }
          {
            /* RENDER THIS DIV IF THE PRODUCT IS FOUND IN THE HYGRAPH DATABASE, AFSHAL */
            scanData?.brands?.length > 0 && (
              <div id="brandFound">
                <div
                  className="border-8 border-transparent"
                  style={{
                    borderImage:
                      "repeating-linear-gradient(-45deg, #f2a417, #f2a417 15px, #141617 15px, #141617 30px)",
                    borderImageSlice: "1",
                  }}
                >
                  <ProductCard
                    imageSrc={decodedProduct?.imageUrl}
                    brandTitle={decodedProduct?.brand}
                    productTitle={decodedProduct?.name}
                  />
                </div>
                <p className="font-bold italic">Caution!</p>
                <p>
                  We have found matches of this product in the Never Again database.
                </p>
                {scanData?.brands?.map?.((brand) => {
                  return (
                    <div key={brand?.id}>
                      <BrandCard
                        imageSrc={brand?.icon?.url ?? ""}
                        brandTitle={brand?.name}
                        brand={brand}
                        key={brand?.id}
                      />
                    </div>
                  );
                })}
              </div>
            )
          }
          <div className="flex justify-center">
            <Button
              className="mt-1 mx-[0.75rem]"
              variant="outline"
              onClick={() => handleScanStartClick()}
            >
              <p className="text-base leading-[1rem]">Scan Again</p>
            </Button>
            <Button
              className="mt-1 mx-[0.75rem]"
              variant="destructive"
              onClick={() => handleReportClick()}
            >
              <p className="text-base leading-[1rem]">Report</p>
              <i
                className="fa-solid fa-circle-exclamation fa-lg pl-1"
                style={{ color: "#ffffff" }}
              />
            </Button>
          </div>
        </div>
      )}
      {/* // SEARCH ON THE BASIS OF FIRST STRING OF THE PRODUCT NAME AS WELL, AFSHAL */}
      {/* {scanData ? (
        scanData?.brands?.map?.((brand) => {
          return (
            <div key={brand?.id}>
              <h3>Brand found in our database</h3>
              <h3>{scannedBrand}</h3>
              <BrandCard
                imageSrc={brand?.icon?.url ?? ""}
                brandTitle={brand?.name}
                brand={brand}
                key={brand?.id}
              />
            </div>
          );
        })
      ) : (
        <div>
          <h3>Brand not found in the database</h3>
        </div>
      )} */}
    </section>
  );
};

export default Scan;
