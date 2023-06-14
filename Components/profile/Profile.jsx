import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import AddressCard from "./AddressCard";
import { setLoader } from "@/store/loaderSlice";
import { setAlert } from "@/store/alertSlice";
import { MdOutlineFlipCameraIos } from "react-icons/md";

import axios from "axios";
import AddAddress from "./AddAddress";
import UpdatePassword from "./UpdatePassword";
import UpdateUserInfo from "./UpdateUserInfo";
function Profile() {
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setbannerImage] = useState("");
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [showFileInput, setShowFileInput] = useState(false);


  const imageUpdate = async () => {
    dispatch(setLoader(true));
    const token = localStorage.getItem("tmToken");

    try {
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/client/update-profile-image",
        {
          profile_image: profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response.data.status) {
        dispatch(setLoader(false));
        dispatch(
          setAlert({
            message: response.data.message,
            color: "green ",
            alert: "success",
          })
        );
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const bannerImageUpdate = async () => {
    dispatch(setLoader(true));
    const token = localStorage.getItem("tmToken");
    console.log("bannerimage");
    try {
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/client/update-banner-image",
        {
          banner_image: bannerImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data.status) {
        dispatch(setLoader(false));
        dispatch(
          setAlert({
            message: response.data.message,
            color: "green ",
            alert: "success",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      console.log(profileImage);
      setShowFileInput(false);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (profileImage) {
      imageUpdate();
    }
  }, [handleImageUpload]);

  // const [address, setAddress] = useState({
  //   address1: "Albur at post",
  //   address2: "evrfev",
  //   city: "Tumkur",
  //   state: " Karnataka",
  //   pincode: "57224",
  //   country: "India",
  // });


  const handleImageUpload2 = (event) => {
    console.log("image");
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setbannerImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (bannerImage) {
      bannerImageUpdate();
    }
  }, [bannerImageUpdate]);
  const handleEditProfileImage = () => {
    setShowFileInput(true);
  };

  const [borderStyle1, setBorderStyle1] = useState("all");
  const [borderStyle2, setBorderStyle2] = useState(false);
  const [borderStyle3, setBorderStyle3] = useState(false);

  const handleButtonClick = (buttonNumber) => {
    setBorderStyle1(buttonNumber === 1 ? "all" : false);
    setBorderStyle2(buttonNumber === 2 ? "all" : false);
    setBorderStyle3(buttonNumber === 3 ? "all" : false);
  };

  return (
    <div className="w-full mr-0">
      <div className="relative border-b-2">
        {user?.profile?.profile_image&&<div
          className="w-full h-48 lg:h-80 bg-cover bg-center "
          style={{ backgroundImage: `url(${user?.profile?.banner_image})` }}
          onClick={() => {
            if (bannerImage) {
              handleImageUpload2;
            }
          }}
        >
          <input
            type="file"
            onChange={handleImageUpload2}
            className="absolute top-0 left-0 w-full opacity-0 cursor-pointer  h-48 lg:h-80"
          />
          <div className="flex items-end px-1 relative  justify-end w-full font-medium">
            <p className=" px-2 py-1 rounded shadow flex items-center text-white">
              <MdOutlineFlipCameraIos size="25px" />
            </p>
            <input
              type="file"
              onChange={handleImageUpload2}
              className="absolute top-0 left-0 w-full opacity-0 cursor-pointer  h-48 lg:h-80"
            />
          </div>
        </div>}

        <div className="bg-white shadow lg:flex">
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 lg:translate-x-0 z-10 lg:top-64 lg:left-10">
            {user?.profile?.profile_image &&<img
              src={user?.profile?.profile_image}
              alt="profile-pic"
              className="rounded-full border-4 h-32 w-32 object-cover  bg-white cursor-pointer"
              onClick={handleEditProfileImage}
            />}
            <div className="relative">
              <MdOutlineFlipCameraIos
                size="30px"
                className="absolute bottom-[0px] left-12 text-white"
                onClick={handleEditProfileImage}
              />
            </div>
            {showFileInput && (
              <input
                type="file"
                onChange={handleImageUpload}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            )}
            <div className="relative"></div>
          </div>
          <div className="p-4 flex items-center flex-col mt-3 lg:mt-0 lg:pl-48  ">
            <h1 className="text-xl font-bold capitalize">
              
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="capitalize">
              {user?.primary_address[0].city}, {user?.primary_address[0].state}
            </p>
          </div>

          <div className="flex gap-10 items-end ml-2 md:ml-10 font-bold justify-center lg:justify-start  md:text-lg">
            <div
              className={`button ${borderStyle1}`}
              onClick={() => handleButtonClick(1)}
            >
              Profile
            </div>
            <div
              className={`button ${borderStyle2}`}
              onClick={() => handleButtonClick(2)}
            >
              Address
            </div>
            <div
              className={`button ${borderStyle3}`}
              onClick={() => handleButtonClick(3)}
            >
              Setting
            </div>
          </div>
        </div>
      </div>
      {borderStyle1 && <UpdateUserInfo />}
      {borderStyle2 && (
        <div className="p-4 md:p-12">
          <p className="font-bold mb-1 text-xl  ml-[-8px] pb-3">
            Primary Address
          </p>
          <div className="mb-4 ">
            <Box
              sx={{
                display: "grid",
                gridGap: "5px",
                gridTemplateColumns: {
                  xs: "45vw 45vw",
                  sm: "40vw 40vw",
                  md: "30vw 30vw",
                  lg: "20vw 20vw",
                },
                padding: "10px",
                width: { xs: "90vw", sm: "80vw", md: "60vw", lg: "40vw" },
              }}
              className="shadow capitalize"
            >
              <div className="flex flex-col pr-10">
                <p htmlFor="gender" className="font-semibold mb-1 text-lg">
                  Address Line 1:
                </p>
                <p>{user?.primary_address[0]?.add_1}</p>
              </div>
              <div className="flex flex-col pr-10">
                <p htmlFor="gender" className="font-semibold mb-1 text-lg">
                  Address Line 2:
                </p>
                <p>{user?.primary_address[0]?.add_2}</p>
              </div>
              <div className="flex flex-col pr-10">
                <p htmlFor="birthday" className="font-semibold mb-1 text-lg">
                  city:
                </p>
                <p>{user?.primary_address[0]?.city}</p>
              </div>
              <div className="flex flex-col pr-10">
                <p htmlFor="birthday" className="font-semibold mb-1 text-lg">
                  State:
                </p>
                <p>{user?.primary_address[0]?.state}</p>
              </div>
              <div className="flex flex-col pr-10">
                <p htmlFor="birthday" className="font-semibold mb-1 text-lg">
                  Country:
                </p>
                <p>{user?.primary_address[0]?.country}</p>
              </div>
              <div className="flex flex-col pr-10">
                <p htmlFor="birthday" className="font-semibold mb-1 text-lg">
                  Pincode:
                </p>
                <p>{user?.primary_address[0]?.zip}</p>
              </div>
            </Box>
          </div>
          <AddAddress />
          <AddressCard />
        </div>
      )}

      {borderStyle3 && <UpdatePassword />}
    </div>
  );
}

export default Profile;
