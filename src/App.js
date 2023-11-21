import React, { useEffect, useState } from "react";
import GeneratePdf from "./widgets/generate_pdf";
import Colums from "./widgets/colums";
import TableData from "./widgets/table_data";

const API_URL = "https://dummyjson.com/products";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchData(API_URL);
  }, []);

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  const exportPdf = (item) => {
    const filename = `products.pdf`;
    const headers = [
      { key: "title", display: "Product Name" },
      { key: "stock", display: "Stock" },
      { key: "price", display: "Price" },
      { key: "category", display: "Category" },
    ];
    GeneratePdf({ data: item, headers, filename });
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">PRODUCTS</h1>
        {products.length === 0 ? (
          <div id="alert-border-1" role="alert">
            <div className="ml-3 text-sm text-center font-medium">
              Nothing Found
            </div>
          </div>
        ) : errorMessage !== null ? (
          <div id="alert-border-2" role="alert">
            <div className="ml-3 text-center text-sm font-medium">
              {errorMessage}
            </div>
          </div>
        ) : (
          <>
            <table className="table table-striped table-responsive">
              {<Colums />}
              <tbody>
                {products.map((item, index) => {
                  return (
                    <>
                      <TableData key={index} data={item} />
                    </>
                  );
                })}
              </tbody>
            </table>
            <button
              className="btn btn-danger mb-5"
              onClick={() => exportPdf(products)}>
              Download PDF
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
