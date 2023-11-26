import React, { useEffect, useState } from "react";

// not used, but this is the compoennt variant to get all the product data, maybe usefull later

const GoUPCApiKey = import.meta.env.VITE_REACT_APP_BARCODE_API_KEY;

interface BarcodeDecoderProps {
  barcodeNumber: string;
}

const BarcodeDecoder: React.FC<BarcodeDecoderProps> = ({ barcodeNumber }) => {
  const api_base_url = "https://go-upc.com/api/v1/code/";
  const url = api_base_url + barcodeNumber + "?key=" + GoUPCApiKey;

  const [productBrand, setProductBrand] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { method: "get" });
        const data = await response.json();
        setProductBrand(data.product.brand);
      } catch (err) {
        throw err;
      }
    };

    fetchData();
  }, [url]);

  // console.log("Scanned product brand is...", productBrand);

  return { productBrand };
};

export default BarcodeDecoder;
