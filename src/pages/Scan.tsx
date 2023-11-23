import { useState } from "react";

// @ts-ignore
import {
  Html5QrcodePlugin,
  ResultContainerPlugin,
} from "../components/QRCodeScanner";

const Scan = () => {
  const [decodedResults, setDecodedResults] = useState([]);
  // @ts-ignore
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("Scan App [result]", decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  return (
    <section className="w-full flex flex-col justify-center items-center text-center my-4">
      <h2>Scan barcode</h2>
      <div className="w-full px-6 md:px-3">
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <ResultContainerPlugin results={decodedResults} />
      </div>
    </section>
  );
};

export default Scan;
