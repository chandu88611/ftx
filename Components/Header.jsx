import { Button } from "@mui/material";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import UserMenu from "./UserMenu";
import HeaderFullScreenToggle from "./FullScreenToggle";
import { AiFillStar } from "react-icons/ai";

import AdjustFontSize from "./AjdustFontsize";
import { useSelector } from "react-redux";
const Header = ({ setIsOpen, isOpen }) => {

  const user = useSelector((state) => state.users.user);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 sm:text-black ">
      <div className="flex items-center justify-between bg-white py-1 md:px-10 px-7">
        <div className="flex items-center">
          <Button
            className="inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none "
            onClick={setIsOpen}
          >
            <GiHamburgerMenu className=" h-6 w-6" />
          </Button>
          <AiFillStar
            style={{
              color: "gold",
              fontSize: "1.8rem",
              marginLeft: isOpen ? "180px" : "",
            }}
          />
        </div>

        <div className="flex g-6 items-center">
          <div className="font">
            <AdjustFontSize />
          </div>
          <div className="font">
            <HeaderFullScreenToggle />
          </div>
          <div className="details mr-2">
            <p className="text-xl text-blue-800 font-semibold">
              {user?.first_name}
            </p>
          </div>
          <div className="avatar">
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
