import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { VscAdd, VscChromeMinimize } from "react-icons/vsc";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { setLoader } from "@/store/loaderSlice";
import { setAlert } from "@/store/alertSlice";
import { useSelector, useDispatch } from "react-redux";

const AddAddress = () => {
  const [addAddress, setAddAddress] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  };

  const validationSchema = Yup.object().shape({
    addressLine1: Yup.string().required("Address Line 1 is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    pincode: Yup.number("Accepts only number").required("Pincode is required"),
  });

  const onSubmit = async (values) => {
    dispatch(setLoader(true));
    const { addressLine1, addressLine2, city, state, country, pincode } = values;
    const token = localStorage.getItem("tmToken");
    try {
      const res = await axios.post(
        "https://admin.tradingmaterials.com/api/client/add-new/address",
        {
          city:city,
          state:state,
          country:country,
          zip:pincode,
          add_1:addressLine1,
          add_2:addressLine2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.data.status) {
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
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false));
      if (error.response.data.errors.zip[0]) {
        dispatch(
          setAlert({
            message: error.response.data.errors.zip[0],
            color: "red ",
            alert: "Error",
          })
        );
      }
      dispatch(
        setAlert({ message: "Request Failed!", color: "red ", alert: "Error" })
      );
    }
    setAddAddress(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const handlePincodeChange = (e) => {
    const { value } = e.target;
    // Only update the formik state if the entered value is a number
    if (/^\d*$/.test(value)) {
      formik.handleChange(e);
    }
  };
  return (
    <div>
      <div className="mb-4 flex gap-5 items-center w-fit bg-blue-600 p-2 rounded-md text-white cursor-pointer"             onClick={() => setAddAddress(!addAddress)}>
        <p className="font-semibold">Add Address</p>
        <VscAdd
            size="25px"

            style={{fontWeight:"bold"}}
          />
      </div>
      {addAddress && (
        <div className="fixed top-0 w-full left-0 h-full flex items-center justify-center bg-bg z-[1000] flex-col gap-1 px-10">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded p-6 sm:px-16 pt-6 pb-8 w-full sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 anim"
          >
            <h1 className="text-xl p-3 text-center font-bold">
              Create New Address
            </h1>
            <div className="mb-4">
              <p className="text-gray-600 font-semibold">Address Line 1</p>
              <textarea
                type="text"
                name="addressLine1"
                value={formik.values.addressLine1}
                onChange={formik.handleChange}
                placeholder="Address Line 1"
                className={`appearance-none border ${
                  formik.errors.addressLine1
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
              />
              {formik.errors.addressLine1 && (
                <p className="text-red-500 text-sm">
                  {formik.errors.addressLine1}
                </p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-semibold">Address Line 2</p>
              <textarea
                type="text"
                name="addressLine2"
                value={formik.values.addressLine2}
                onChange={formik.handleChange}
                placeholder="Address Line 2"
                className={`appearance-none border ${
                  formik.errors.addressLine2
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
              />
              {formik.errors.addressLine2 && (
                <p className="text-red-500 text-sm">
                  {formik.errors.addressLine2}
                </p>
              )}
            </div>
            <div className="flex gap-5">
              <div className="mb-4 w-full">
                <p className="text-gray-600 font-semibold">City</p>
                <input
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  placeholder="City"
                  className={`appearance-none border ${
                    formik.errors.city ? "border-red-500" : "border-gray-300"
                  } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                />
                {formik.errors.city && (
                  <p className="text-red-500 text-sm">{formik.errors.city}</p>
                )}
              </div>
              <div className="mb-4 w-full">
                <p className="text-gray-600 font-semibold">State</p>
                <input
                  type="text"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  placeholder="State"
                  className={`appearance-none border ${
                    formik.errors.state ? "border-red-500" : "border-gray-300"
                  } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                />
                {formik.errors.state && (
                  <p className="text-red-500 text-sm">{formik.errors.state}</p>
                )}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="mb-4 w-full">
                <p className="text-gray-600 font-semibold">Country</p>
                <input
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  placeholder="Country"
                  className={`appearance-none border ${
                    formik.errors.country ? "border-red-500" : "border-gray-300"
                  } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                />
                {formik.errors.country && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.country}
                  </p>
                )}
              </div>
              <div className="mb-4 w-full">
                <p className="text-gray-600 font-semibold">Pincode</p>
                <input
                  type="text"
                  name="pincode"
                  value={formik.values.pincode}
                  onChange={handlePincodeChange}
                  placeholder="Pincode"
                  className={`appearance-none border ${
                    formik.errors.pincode ? "border-red-500" : "border-gray-300"
                  } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                />
                {formik.errors.pincode && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.pincode}
                  </p>
                )}
              </div>
            </div>
            <hr />
            <div className="flex items-center justify-end mt-3 gap-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <Button
                variant="outlined"
                onClick={() => setAddAddress(!addAddress)}
                sx={{ color: "red", border: "1px solid red" }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddAddress;
