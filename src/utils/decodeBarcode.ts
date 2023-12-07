const GoUPCApiKey = import.meta.env.VITE_REACT_APP_BARCODE_API_KEY;
import mpTracker from "../lib/mixpanel";

const decodeBarcode = async (barcodeNumber: string): Promise<string | null> => {
  const api_base_url = "https://go-upc.com/api/v1/code/";
  const url = `${api_base_url}${barcodeNumber}?key=${GoUPCApiKey}`;

  try {
    const response = await fetch(url, { method: "get" });
    // console.log("response", await response.json())
    const data = await response.json();
    const productData = data.product;
    mpTracker.trackScanner('API - Scan BarcodeDecoder - UPC', { productData });
    if (productData !== null) {
      return productData;
    } else {
      throw new Error("This barcode's product was not found in the database");
    }
  } catch (error) {
    console.error("Error decoding barcode:", error);
    throw error;
  }
};

export default decodeBarcode;
