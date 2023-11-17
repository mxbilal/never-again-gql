// import React from 'react'
import { Button } from "@/components/ui/button";
// @ts-ignore
import Html5QrcodePlugin from "../components/QRCodeScanner";

const Scan = () => {
  // @ts-ignore
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText, decodedResult);
  };
  return (
    <section className="w-full flex flex-col justify-center items-center text-center">
      <div className="w-full px-6 md:px-3 my-4">
        <h2>Scan barcode</h2>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <Button variant="outline">
          <p className="text-base mr-2">Scan</p>
          <i className="fas fa-barcode fa-lg" />
        </Button>
      </div>
    </section>
  );
};

export default Scan;
