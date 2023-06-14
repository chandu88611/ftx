import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  MdBorderAll,
  MdOutlineArrowDropUp,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
  MdArrowDropDown,
} from "react-icons/md";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";

import { BiTransfer, BiMap, BiDetail } from "react-icons/bi";
import Link from "next/link";

function Sidebar({ setIsOpen }) {
  const user = useSelector((state) => state.users.user);
  console.log(user, "jni");
  const router = useRouter();
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleOrdersClick = () => {
    setIsOrdersOpen(!isOrdersOpen);
  };
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let [open, setOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem("tmToken");
    router.push("/login");
  };
  return (
    <div className="flex -z-50">
      <div className="  bg-customColor">
        <div className="flex justify-between mb-3 items-center">
          <img src="/logo-light.png" alt="logo-light.png" className="w-36 h-14  p-2" />
          <GiHamburgerMenu
            className=" h-6 w-6 text-white ml-14 cursor-pointer"
            onClick={setIsOpen}
          />
        </div>

        <div className="flex flex-col items-center mt-5">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            {user?.profile?.profile_image&&<img
              className="w-full h-full object-cover"
              src={`${user?.profile?.profile_image}`}
              alt="User Profile"
            />}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-white">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-col justify-start item-center ">
          <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
            Virtual Dashboard
          </h1>
          <div className=" my-4 border-b border-gray-100 pb-4">
            <div
              className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              onClick={handleOrdersClick}
            >
              <MdBorderAll className="text-2xl text-white group-hover:text-white" />
              <h3 className="text-base text-white group-hover:text-white font-semibold flex align-middle">
                Orders
              </h3>
              {isOrdersOpen ? (
                <MdOutlineArrowDropUp className="text-2xl text-white group-hover:text-white" />
              ) : (
                <MdArrowDropDown className="text-2xl text-white group-hover:text-white" />
              )}
            </div>
            {isOrdersOpen && (
              <div className="pl-8">
                <Link href="/dashboard/recentorders">
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <h3 className="text-base text-white group-hover:text-white font-semibold">
                      Recent Orders
                    </h3>
                  </div>
                </Link>
                <Link href="/dashboard/completedorders">
                  
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <h3 className="text-base text-white group-hover:text-white font-semibold">
                      Completed Orders
                    </h3>
                  </div>
                </Link>
                <Link href="/dashboard/ordercancelled">
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <h3 className="text-base text-white group-hover:text-white font-semibold">
                      Order Cancelled
                    </h3>
                  </div>
                </Link>
                <Link href="/dashboard">
                  <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <h3 className="text-base text-white group-hover:text-white font-semibold">
                      Refund Orders
                    </h3>
                  </div>
                </Link>
              </div>
            )}

            <div
              className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              onClick={handleCartClick}
            >
              <AiOutlineShoppingCart className="text-2xl text-white group-hover:text-white " />
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Cart
              </h3>

              {isCartOpen ? (
                <MdOutlineArrowDropUp className="text-2xl text-white group-hover:text-white" />
              ) : (
                <MdArrowDropDown className="text-2xl text-white group-hover:text-white" />
              )}
            </div>

            {isCartOpen && (
              <div className="pl-8">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <h3 className="text-base text-white group-hover:text-white font-semibold">
                    Current Items
                  </h3>
                </div>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <h3 className="text-base text-white group-hover:text-white font-semibold">
                    Removed
                  </h3>
                </div>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <h3 className="text-base text-white group-hover:text-white font-semibold">
                    Future Saved
                  </h3>
                </div>
              </div>
            )}
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <BiMap className="text-2xl text-white group-hover:text-white " />
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Address
              </h3>
            </div>
            <Link href="/dashboard/orderdetails">
              
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiDetail className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Order Details
                </h3>
              </div>
            </Link>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <BiTransfer className="text-2xl text-white group-hover:text-white " />
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Payment History
              </h3>
            </div>
          </div>
       
          {/* <div className=" my-4 border-b border-gray-100 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineSettings className="text-2xl text-white group-hover:text-white " />
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Settings
              </h3>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineMoreHoriz className="text-2xl text-white group-hover:text-white " />
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                More
              </h3>
            </div>
          </div> */}
          <div className=" my-4">
            <div
              className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              onClick={logOut}
            >
              <MdOutlineLogout className="text-2xl text-white group-hover:text-white " />
              <h3 className="text-base text-white group-hover:text-white font-semibold ">
                Logout
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
