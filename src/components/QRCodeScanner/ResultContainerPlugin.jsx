import React, { useEffect, useState } from "react";
// import BarcodeDecoder from "../BarcodeDecoder";
import { getScannedBrands } from "@/api/hooks";
import Loader from "../Loader";
import decodeBarcode from "../../utils/decodeBarcode";

function filterResults(results) {
  let filteredResults = [];
  for (var i = 0; i < results.length; ++i) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }

    if (results[i].decodedText !== results[i - 1].decodedText) {
      filteredResults.push(results[i]);
    }
  }
  return filteredResults;
}

const ResultContainerTable = ({ data }) => {
  const results = filterResults(data);
  return (
    <div className="flex justify-center items-center">
      <table className={"Qrcode-result-table"}>
        <tbody>
          {results.map((result, i) => {
            console.log(result);
            return (
              <>
                <tr key={i}>
                  <td className="px-4 py-1">{i}</td>
                  <td className="px-4 py-1">{result.decodedText}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ResultContainerPlugin = (props) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scanned, setScanned] = useState(null);
  let { scanLoading, scanError, scanData } = getScannedBrands(scanned);
  const results = filterResults(props.results);
  useEffect(() => {
    console.log("results", results);
    const fetchScannedBrands = async () => {
      try {
        const brandPromises = results.map(async (result) => {
          try {
            console.log("productBrand");
            // setScanned("Starbucks")
            const productBrand = await decodeBarcode(result.decodedText);
            console.log("request end", productBrand);
            setScanned(productBrand);
            return;
          } catch (error) {
            throw new Error(
              "This barcode's brand was not found in the database"
            );
          }
        });

        // const brandResults = await Promise.all(brandPromises);
        // const brandData = brandResults.map((result) => result.data);
        // setBrands(brandData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (results.length > 0) {
      console.log("inside if statement");
      fetchScannedBrands();
    }
  }, [results.length]);

  if (loading) {
    return <Loader />;
  }

  if (error) return <p>Error : {error.message}</p>;
  console.log("scanData", scanData);
  return (
    <div className="Result-container">
      <div className="Result-header">Scanned results ({results.length})</div>
      <div className="Result-section">
        <ResultContainerTable data={results} />
      </div>
      <div>
        {scanData?.brands?.map?.((brand, index) => (
          <div key={index}>
            <h2>Brand found to boycott</h2>
            <h3>{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultContainerPlugin;
