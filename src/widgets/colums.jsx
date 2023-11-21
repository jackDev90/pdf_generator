import React from "react";

function Colums() {
  return (
    <>
      <thead>
        <tr>
          <th scope="col" className="px-6 py-3">
            Product name
          </th>
          <th scope="col" className="px-6 py-3">
            Stock
          </th>
          <th scope="col" className="px-6 py-3">
            Category
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" id="print" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
    </>
  );
}

export default Colums;
