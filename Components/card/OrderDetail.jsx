import React, { useState } from "react";
import { RiUserLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineLocalShipping } from "react-icons/md";

function OrderDetail() {
  const [products, setProducts] = useState(false);
  const [orders, setOrders] = useState(true);
  const [invoice, setInvoice] = useState(false);

  function updateState(state) {
    switch (state) {
      case "products":
        setProducts(true);
        setOrders(false);
        setInvoice(false);
        break;
      case "orders":
        setProducts(false);
        setOrders(true);
        setInvoice(false);
        break;
      case "invoice":
        setProducts(false);
        setOrders(false);
        setInvoice(true);
        break;
      default:
        break;
    }
  }
  return (
    <div className="w-full ">
      <div className="flex gap-6 text-lg font-bold m-3 w-full flex-grow">
        <p className="cursor-pointer" onClick={() => updateState("orders")}>
          Order Details
        </p>
        <p className="cursor-pointer" onClick={() => updateState("products")}>
          Products
        </p>
        <p className="cursor-pointer" onClick={() => updateState("invoice")}>
          Invoice
        </p>
      </div>

      <hr />
      {orders && (
        <div>
          <div className="flex m-8 gap-5 items-center font-bold text-lg  text-gray-500">
            {" "}
            <RiUserLine size="30px" /> Customer Name
          </div>
          <div className=" m-5">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">chandan</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    aschandan88@gmailcom
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">8865554222</td>
                  <td className="px-6 py-4 whitespace-nowrap">fgh</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex m-8 gap-5 items-center font-bold text-lg text-gray-500">
            {" "}
            <BiTimeFive size="30px" /> Order Status
          </div>
          <div className=" m-5">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Updated On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">chandan</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    aschandan88@gmailcom
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex m-8 gap-5 items-center font-bold text-lg text-gray-500">
            {" "}
            <RiMoneyDollarCircleLine size="30px" />
            Payment
          </div>
          <div className=" m-5">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Transaction Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">chandan</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    aschandan88@gmailcom
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">8865554222</td>
                  <td className="px-6 py-4 whitespace-nowrap">fgh</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex m-8 gap-5 items-center font-bold text-lg text-gray-500">
            {" "}
            <MdOutlineLocalShipping size="30px" />
            Shipping
          </div>
          <div className=" m-5">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tracking code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Carrier
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Weight
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">chandan</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    aschandan88@gmailcom
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">8865554222</td>
                  <td className="px-6 py-4 whitespace-nowrap">fgh</td>
                  <td className="px-6 py-4 whitespace-nowrap">fgh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {invoice && (
        <div className=" p-2 md:p-9 w-full  ">
          <div className="w-full  flex">
            <div
              style={{
                borderRight: "1px solid rgb(200,200,200,.5)",
                paddingRight: "5px",
              }}
            >
              <p className="text-gray-500"> 26-06-2000</p>
              <h2 className="mt-3 md:text-lg ">
                INVOICE
                <span className="text-gray-500"> 70d4d7d0</span>{" "}
              </h2>
              <p className="mt-10">chandan</p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
              </p>
              <p>aschandan88@gmail.com</p>
            </div>
            <div className="md:flex items-center gap-6 justify-center p-3">
              <div className=" ">
                <img
                  src="https://gtechwebservice.com/TradingMaterial/assets/images/logo/tm-logo.png"
                  alt=""
                  className="bg-white m-2 "
                />
              </div>

              <div className="text-xs sm:text-sm">
                <p className="font-bold">Trading Material</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
          <div className=" mt-10">
            <table className=" divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">chandan</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    aschandan88@gmailcom
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">8865554222</td>
                  <td className="px-6 py-4 whitespace-nowrap">fgh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {products && (
        <div className=" m-5">
          <table className=" divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-8 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-8 py-4 whitespace-nowrap">chandan</td>
                <td className="px-8 py-4 whitespace-nowrap">
                  aschandan88@gmailcom
                </td>
                <td className="px-8 py-4 whitespace-nowrap">8885554222</td>
                <td className="px-8 py-4 whitespace-nowrap">fgh</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
