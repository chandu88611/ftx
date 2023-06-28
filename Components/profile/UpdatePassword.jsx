import React, { useRef, useState } from "react";
import { Button } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { AiFillEye } from "react-icons/ai";
import { setLoader } from "@/store/loaderSlice";
import { setAlert } from "@/store/alertSlice";
import axios from "axios";
import { RiLoaderFill } from "react-icons/ri";
function UpdatePassword() {
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [message, setMessage] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState("Verify");
  const dispatch = useDispatch();
  const newPasswordRef = useRef(null);
  const [password, setpassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const showpassword = () => {
    setShow(!show);
  };

  const showpassword1 = () => {
    setShow1(!show1);
  };

  const updatePassword = async () => {
    dispatch(setLoader(true));
    const token = localStorage.getItem("tmToken");
    try {
      const { password, confirmPassword } = formik.values;
      const res = await axios.post(
        "https://admin.tradingmaterials.com/api/client/password-reset",
        { password: password, confirm_password: confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status) {
        dispatch(setLoader(false));
        dispatch(
          setAlert({
            message: res.data.message,
            color: "green ",
            alert: "success",
          })
        );
      }
    } catch (error) {
      console.log(error);

      dispatch(setAlert({ message: "Error ", color: "blue" }));
    }
  };

  const handlePasswordChange = (event) => {
    setMessage("");
    const { name, value } = event.target;
    setpassword((prevAddress) => ({ ...prevAddress, [name]: value }));
    console.log(password);
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required.")
      .min(8, " At least 6 characters long.")
      .max(15, "Password must be at Max 15 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm Password is required."),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: () => {
      // Perform password reset logic here
    },
  });

  const checkPassword = async () => {
    if(!password.currentPassword){
      setMessage("Enter Pasword")
    }

    if(password.currentPassword){
    setVerifying(true);

    const token = localStorage.getItem("tmToken");
    try {
      const res = await axios.post(
        "https://admin.tradingmaterials.com/api/client/verify-old-password",
        { old_password: password.currentPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status) {
        if (newPasswordRef.current) {
          newPasswordRef.current.focus();
        }

        console.warn(res);

        setVerified("Verified");
        if (newPasswordRef.current) {
          newPasswordRef.current.focus();
        }
        setDisabled(false);
        setVerifying(false);
      }
    } catch (error) {
      console.log(error);
      // dispatch(setAlert({ message: "Enter Correct Password", color: "red" }));
      // setDisabled(true)
      console.log(error);
      setVerifying(false);
      setMessage(error.response.data.message);
    }}
  };
  return (
    <div>
      <div className="p-8">
        <p className="text-xl mb-2 font-semibold">Change Password</p>
        <div className="p-6 shadow  w-full sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/4 ml-2">
          {verified === "Verify" && (
            <div className="flex flex-col gap-1 mb-6">
              <label htmlFor="current pasword">Current Password</label>
              <input
                type="text"
                name="currentPassword"
                onChange={handlePasswordChange}
                placeholder="current password"
                disabled={!disabled}
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
              />
              <p className="text-red-500">{message}</p>
              <Button
                variant="outlined"
                onClick={checkPassword}
                disabled={!disabled}
              >
                {!verifying ? (
                  verified
                ) : (
                  <RiLoaderFill size="20px" className="rotate" />
                )}
              </Button>
            </div>
          )}
          {verified === "Verified" && (
            <div className=" flex flex-col items-center">
              <div className="mb-4 relative w-full ">
                <label htmlFor="password" className="block mb-2">
                  New Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  ref={newPasswordRef}
                  name="password"
                  pattern="[0-9]*"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`border ${
                    formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-8 py-2 w-full`}
                  disabled={disabled}
                />
                <AiFillEye
                  className="absolute top-11 right-4 cursor-pointer   "
                  onClick={showpassword}
                />
              </div>
              {formik.errors.password && (
                <p className="text-red-500 mt-[-15px] mb-4 text-xs">
                  {formik.errors.password}
                </p>
              )}
              <div className="mb-4 relative w-full ">
                <label htmlFor="confirmPassword" className="block mb-2 ">
                  Confirm Password
                </label>
                <input
                  type={show1 ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={`border ${
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-8 py-2 w-full`}
                  disabled={disabled}
                />

                <AiFillEye
                  className="absolute top-11 right-4 cursor-pointer  "
                  onClick={showpassword1}
                />
              </div>
              {formik.errors.confirmPassword && (
                <p className="text-red-500 mt-[-15px] mb-4 text-xs ">
                  {formik.errors.confirmPassword}
                </p>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-left"
                onClick={updatePassword}
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
