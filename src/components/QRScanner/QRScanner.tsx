import React from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import mpTracker from '../../lib/mixpanel';

const QRScanner = () => {
  return (
    <>
      <div className="lg:hidden" id="smallerDisplays">
        <QrScanner
          onDecode={(result) => console.log(result)}
          containerStyle={{
            width: "85%",
          }}
          onError={(error) => {
            console.log("Qr scanner error is...", error?.message);
            mpTracker.track('API - Error - ' + error?.message);
          }}
        />
      </div>
      <div className="hidden lg:block" id="largerDisplays">
        <QrScanner
          onDecode={(result) => console.log(result)}
          containerStyle={{
            width: "45%",
            height: "45%",
          }}
          onError={(error) => {
            console.log("Qr scanner error is...", error?.message);
            mpTracker.track('API - Error - ' + error?.message);
          }}
        />
      </div>
    </>
  );
};

export default QRScanner;
