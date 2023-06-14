import { Button } from "@mui/material";
import React, { useEffect } from "react";

function CourseCard({
  status,
  price,
  productName,
  description,
  image,
  orderId,
  orderedDate,
  address,
}) {
  const colorCheck = (status) => {
    return status.toLowerCase().includes("in");
  };
  useEffect(() => {
    console.log(colorCheck("inpo"), "fdbcgh");
  }, []);
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden ">
      <div className="px-4 py-3 bg-card text-white flex items-center justify-between">
        <span
          className="text-sm font-bold"
          style={{ color: colorCheck(status) ? "orange" : "yellowgreen" }}
        >
          {status}
        </span>
        <span className="ml-2">${price}</span>
      </div>
      <div className="px-4 py-3">
        <h3 className="text-xl font-bold">{productName}</h3>
        <p className="text-gray-500 h-16">{description}</p>
      </div>
      {/* <div className="relative">
        <img src={image} alt="Product" className="w-full h-auto" />
      </div> */}
      <hr />

      <div className="px-4 py-2 flex justify-between">
        <span className="text-gray-500">Order ID:</span>
        <span>{orderId}</span>
      </div>
      <div className="px-4 py-2 flex justify-between">
        <span className="text-gray-500">Ordered Date:</span>
        <span>{orderedDate}</span>
      </div>
      <div className="px-4 py-2 flex justify-between">
        <span className="text-gray-500">Address:</span>
        <p>{address}</p>
      </div>
      <div className="flex justify-start m-3">
        <Button variant="outlined" className="">
          {" "}
          View
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
