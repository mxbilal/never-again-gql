import { useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";

import { getScannedBrands } from "@/api/hooks";

import ProductCard from "@/components/ProductCard/ProductCardGreen";
import ProductCardBoyCott from "@/components/ProductCard/ProductCardBoyCott";
import Loader from "@/components/Loader";
import decodeBarcode from "@/utils/decodeBarcode";
import { Button } from "@/components/ui/button";

import scannerImage from "../assets/images/scanner.png";
import BrandCard from "@/components/BrandCard";

import mpTracker from "@/lib/mixpanel";

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

  const navigate = useNavigate();

  const { scanLoading, scanError, scanData, refetch } = getScannedBrands({
    name: null,
  });
  const handleScanStartClick = () => {
    const divCameraFix = document.getElementById("NeverAppCameraEnabled");
    divCameraFix.classList.add("on");
    const divs = document.querySelectorAll(".NeverScannerStatus");
    divs.forEach((div) => {
      div.style.display = "none";
    });
    mpTracker.track(`Scan - Link - Start Scan`);
    setStartScan(true);
    window.location.reload();
  };

  // setDbScanData(scanData);
  const handleScanStartClickFirst = () => {
    const divs = document.querySelectorAll(".NeverScannerStatus");
    divs.forEach((div) => {
      div.style.display = "none";
    });
    const divCameraFix = document.getElementById("NeverAppCameraEnabled");
    divCameraFix.classList.add("on");
    mpTracker.track(`Scan - Link - Start Scan`);
    setStartScan(true);
    navigate("/scan");
  };

  const handleScanAnotherItemClick = () => {
    mpTracker.track(`Scan - Link - Scan Another`);
    window.location.reload();
    navigate("/scan", { replace: true });
  };

  const handleScanStopClick = () => {
    const divs = document.querySelectorAll(".NeverScannerStatus");
    divs.forEach((div) => {
      div.style.display = "";
    });
    const divCameraFix = document.getElementById("NeverAppCameraEnabled");
    divCameraFix.classList.remove("on");
    mpTracker.track(`Scan - Link - Stop Scan`);
    setStartScan(false);
  };

  const handleReportClick = () => {
    mpTracker.track(`Scan - Link - Report`);
    navigate("/contact");
  };

  const fetchScannedBrands = async (scannedNumber: string) => {
    try {
      const result = await refetch({
        barcode: [parseFloat(scannedNumber ?? 0)],
      });
      if (result.data?.brands && result.data?.brands?.length === 0) {
        const productData = await decodeBarcode(scannedNumber);
        setDecodedProduct(productData);
        setScannedBrand(productData);

        await onScannedProductDetails(productData);
        setSuccessfulDecode(true);
        const divs = document.querySelectorAll(".NeverScannerStatus");
        divs.forEach((div) => {
          div.style.display = "";
        });
        mpTracker.track(`Scan - Data - Success`);
        mpTracker.trackScanner("Scan - Data - Success", { productData });
      } else {
        setSuccessfulDecode(true);
        const divs = document.querySelectorAll(".NeverScannerStatus");
        divs.forEach((div) => {
          div.style.display = "none";
        });
        mpTracker.track(`Scan - Data - Success`);
        // mpTracker.trackScanner("Scan - Data - Success", { productData });
      }
      return;
    } catch (error) {
      const divs = document.querySelectorAll(".NeverScannerStatus");
      divs.forEach((div) => {
        div.style.display = "";
      });
      const divCameraFix = document.getElementById("NeverAppCameraEnabled");
      divCameraFix.classList.add("on");
      setError(error);
      mpTracker.track(`Scan - Data - Fail`);
      mpTracker.trackScanner("Scan - Data - Fail", { productData });
    } finally {
      setLoading(false);
    }
  };

  const onNewScanResult = async (scannedNumber: string) => {
    setLoading(true);
    setScannedNumber(scannedNumber);
    mpTracker.track(`Scan - Data - New Success`);
    mpTracker.track(`Scan - Data - ${scannedNumber}`);
    await fetchScannedBrands(scannedNumber);
    setStartScan(false);
  };

  const onScannedProductDetails = async (decodedProductBrand: any) => {
    await refetch({
      barcode: decodedProductBrand?.ean ? [decodedProductBrand?.ean] : [],
      name: decodedProductBrand?.name || "",
      brand: decodedProductBrand?.brand || "",
    });
  }; //

  if (loading) {
    return <Loader />;
  }

  if (error)
    return (
      <div>
        <p className="p-6 text-center text-red-700">
          <strong>Error:</strong>
          <br />
          {error.message}.<br />
          We will, however, continue to work on this issue.
          <br />
          If you feel this is product error, please press report.
        </p>
        <div className="flex flex-col items-center justify-center md:flex-row">
          <Button
            className="mt-1 mx-[0.75rem]"
            variant="outline"
            size="super"
            onClick={() => handleScanStartClick()}
          >
            <p className="leading-[1rem]">
              <span className="text-2xl">Scan Again </span>
              <i className="fas fa-barcode fa-sm" />
            </p>
          </Button>
          <Button
            className="mt-1 mx-[0.75rem]"
            variant="destructive"
            size="super"
            onClick={() => handleReportClick()}
          >
            <p className="text-2xl leading-[1rem]">Report</p>
            <i
              className="fa-solid fa-circle-exclamation fa-lg pl-1"
              style={{ color: "#ffffff" }}
            />
          </Button>
        </div>
      </div>
    );

  return (
    <section className="w-full flex relative flex-col justify-center items-center text-center my-0">
      <h2 id="scan-section"></h2>
      {startScan && !successfulDecode && (
        <>
          <div className="NeverAppBarCodeWrapper z-10 relative h-full w-full top-0">
            <QrScanner
              onDecode={(result) => onNewScanResult(result)}
              containerStyle={{ width: "100%", paddingTop: "100%" }}
              onError={(error) =>
                console.log("Qr scanner error is...", error?.message)
              }
            />
          </div>
          <div className="NeverScannerStop absolute top-5 right-5 z-20">
            <Button
              className="mt-1 mx-[0.75rem]"
              variant="outline"
              size="supernopadding"
              onClick={() => handleScanStopClick()}
            >
              <p className="text-2xl leading-[1rem]">
                <i className="fas fa-x fa-sm" />
              </p>
            </Button>
          </div>
        </>
      )}
      {!startScan && !successfulDecode && (
        <div className="flex justify-center w-full items-center flex-col">
          <img
            src={scannerImage}
            alt="Scan"
            className="flex justify-center mx-[0.75rem] w-1/5 mb-4"
          />
          <div className="flex justify-center">
            <Button
              className="mt-1 mx-[0.75rem]"
              variant="outline"
              size="super"
              onClick={() => handleScanStartClickFirst()}
            >
              <p className="leading-[1rem]">
                <span className="text-2xl">Scan </span>
                <i className="fas fa-barcode fa-sm" />
              </p>
            </Button>
          </div>
        </div>
      )}
      {successfulDecode && (
        <div className="container mx-auto max-w-screen-md">
          <div className="px-3 md:px-0 mt-1 mb-2" id="results">
            {!scanData?.brands?.length && (
              <div id="brandNotFound">
                <h1 className="mt-0 font-bold italic">Great!</h1>
                <p>This product does not appear in the Never Again database.</p>

                <div className="border-8 rounded-2xl mt-3 border-neverLime">
                  <ProductCard
                    imageSrc={decodedProduct?.imageUrl}
                    brandTitle={decodedProduct?.brand}
                    productTitle={decodedProduct?.name}
                  />
                </div>
              </div>
            )}

            {scanData?.brands?.length > 0 && (
              <div id="brandFound">
                <h1 className="mt-0 font-bold italic">Caution!</h1>
                <p>We found a match in the Never Again database.</p>
                {decodedProduct && (
                  <div
                    className="border-8 bg-red-100 border-transparent mt-3"
                    style={{
                      borderImage:
                        "repeating-linear-gradient(-45deg, #f2a417, #f2a417 15px, #141617 15px, #141617 30px)",
                      borderImageSlice: "1",
                    }}
                  >
                    <ProductCardBoyCott
                      imageSrc={decodedProduct?.imageUrl}
                      brandTitle={decodedProduct?.brand}
                      productTitle={decodedProduct?.name}
                    />
                  </div>
                )}
                <br />
                <p></p>
                <br />
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
            )}

            <div className="flex flex-col sm:flex-row justify-center mb-2">
              <Button
                className="mt-4 mx-[0.75rem]"
                variant="outline"
                size="super"
                onClick={() => handleScanAnotherItemClick()}
              >
                <p className="leading-[1rem]">
                  <span className="text-2xl">Scan Again </span>
                  <i className="fas fa-barcode fa-sm" />
                </p>
              </Button>
              <Button
                className="mt-4 mx-[0.75rem]"
                variant="destructive"
                size="super"
                onClick={() => handleReportClick()}
              >
                <p className="text-1xl leading-[1rem]">Feedback</p>
                <i
                  className="fa-solid fa-circle-exclamation fa-lg pl-1"
                  style={{ color: "#ffffff" }}
                />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Scan;
