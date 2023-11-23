import React from "react";

function TableData({ data }) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {data.title}
        </th>
        <td className="px-6 py-4">{data.stock}</td>
        <td className="px-6 py-4 capitalize">{data.category}</td>
        <td className="px-6 py-4">ZMW {data.price}</td>
        <td id="hideActions">
          <button className="btn btn-sm btn-info">Edit</button>
          <button className="btn btn-sm btn-danger">Delete</button>
        </td>
      </tr>
    </>
  );
}

export default TableData;
