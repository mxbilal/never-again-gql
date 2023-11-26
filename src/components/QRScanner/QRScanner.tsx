import React from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

const QRScanner = () => {
  return (
    <>
      <div className="lg:hidden" id="smallerDisplays">
        <QrScanner
          //  pass the function as prop
          // onDecode={(result) => onNewScanResult(result)}
          onDecode={(result) => console.log(result)}
          containerStyle={{
            width: "85%",
          }}
          onError={(error) =>
            console.log("Qr scanner error is...", error?.message)
          }
        />
      </div>
      <div className="hidden lg:block" id="largerDisplays">
        <QrScanner
          onDecode={(result) => console.log(result)}
          containerStyle={{
            width: "45%",
            height: "45%",
          }}
          onError={(error) =>
            console.log("Qr scanner error is...", error?.message)
          }
        />
      </div>
    </>
  );
};

export default QRScanner;
