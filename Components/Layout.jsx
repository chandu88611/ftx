import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "@/store/userSlice";
import ProtectedRoute from "./ProtectedRoute";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.users.user);
  const loading = useSelector((state) => state.loader);
  const message = useSelector((state) => state.alert);
  const [isMessageActive, setIsMessageActive] = useState(false);
  const dispatch = useDispatch();
  const router=useRouter()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleHardRefresh = () => {
    console.log("c")
    const url = `${window.location.pathname}?cache=${Date.now()}`;
    router.reload(url);
  };
  const fetchData = async () => {
    const authToken = localStorage.getItem("tmToken"); // Replace with your cookie retrieval logic

    if (authToken) {
      try {
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/get-user-info",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const { data } = response;
        dispatch(addUser(data.data.client));
        console.log("chandan", message);

        console.log(user, "ehhfb");
        setUserData(data);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
          localStorage.removeItem("tmToken");
        }
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const getCookie = (name) => {
  //   const cookies = document.cookie.split(';');
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].trim();
  //     if (cookie.startsWith(name + '=')) {
  //       return cookie.substring(name.length + 1);
  //     }
  //   }
  //   return null;
  // };

  return (
    <>
      {loading ? (
        <div
          className="fixed top-0 w-full left-0 h-full flex items-center justify-center  bg-bg z-[1000] flex-col gap-1 px-10 bgaa  bg-cover"
          style={{ backgroundImage: `url(/trdr.jpg)` }}
        >
          <div className="overlay"></div>
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        </div>
      //   <ClipLoader
      //   color={"blue"}
      //   loading={loading}
      //   cssOverride={true}
      //   size={150}
      //   aria-label="Loading Spinner"
      //   data-testid="loader"
      // />
      ) : (
        <Box>
          {message.message && (
            <>
              <div
                className={`fixed inset-0 bg-gray-100 opacity-30 z-[1000]  w-full h-full ${
                  isMessageActive ? "cursor-pointer" : ""
                }`}
                onClick={() => setIsMessageActive(!isMessageActive)}
              ></div>
              <div
                className={`fixed bg-white p-5 text-center top-1/2 left-1/2 z-[4000] w-3/4 sm:w-[56vw] md:w-[40vw] lg:w-[29vw] py-10 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-2xl font-semibold ${
                  isMessageActive ? "shake" : ""
                }`}
              >
                <p className="font-semibold textxl p-2 uppercase text-blue-950">
                  {message.alert}
                </p>
                <hr />

                <p style={{ color: `${message.color}` }} className="py-4">
                  {message.message}
                </p>
                <Button
                  variant="outlined"
                  className="font-semibold"
                  onClick={handleHardRefresh}
                >
                  Ok
                </Button>
              </div>
            </>
          )}

          <div
            className={`fixed inset-y-0 left-0 z-50 bg-gray-900 w-64 px-4 py-6 transition-transform duration-300 ease-in-out transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar setIsOpen={toggleSidebar} />
          </div>

          <Box sx={{ display: "flex", position: "relative", zIndex: "20" }}>
            <Header setIsOpen={toggleSidebar} isOpen={isOpen} />
            {isOpen && (
              <div
                className="fixed inset-0 bg-gray-300 opacity-50 z-40 md:hidden"
                onClick={toggleSidebar}
              ></div>
            )}
          </Box>
          <div
            className={`${
              isOpen ? "md:ml-[65px]" : ""
            } mt-[85px] children-container`}
          >
            {isOpen ? (
              <Box className="ml-5 lg:ml-48 ">{children}</Box>
            ) : (
              <Box className="">{children}</Box>
            )}
          </div>
        </Box>
      )}
    </>
  );
}

const ProtectedLayout = ProtectedRoute(Layout);

export default ProtectedLayout;
