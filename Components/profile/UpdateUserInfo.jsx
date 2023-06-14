import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, p } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setLoader } from "@/store/loaderSlice";
import { setAlert } from "@/store/alertSlice";
function UpdateUserInfo() {
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    phone: Yup.string().required("Phone is required.").min(10,"minimun 10 Charecters").max(10,"max 10 Charecters"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      phone: user?.phone,
    },
    validationSchema,
    onSubmit: () => {
      // Perform password reset logic here
    },
  });

  const updateUserInfo = async () => {
    dispatch(setLoader(true));
    const { firstName, lastName, email, phone } = formik.values;
    const token = localStorage.getItem("tmToken");

    try {
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/client/update",
        {
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false));
      if(error.response.data.errors.email[0]){
      dispatch(
        setAlert({
          message: error.response.data.errors.email[0],
          color: "red ",
          alert: "Failed",
        }))}

      // if(error.response.data.errors.phone[0]){
      //   dispatch(
      //     setAlert({
      //       message: error.response.data.errors.phone[0],
      //       color: "red ",
      //       alert: "Failed",
      //     }))}
      
      // dispatch(setAlert(error.res,"red","success"));
    }
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);


  const handlePincodeChange = (e) => {
    const { value } = e.target;
    // Only update the formik state if the entered value is a number
    if (/^\d*$/.test(value)) {
      formik.handleChange(e);
    }
  };
  return (
    <Card className="mb-32">
      <div className="px-4 pt-14 flex  gap-5  mt-1">
        <p className="text-xl font-bold ">General Information</p>

        {editMode ? (
          <>
            <Button
              variant="outlined"
              className="text-xs"
              onClick={updateUserInfo}
              disabled={!formik.isValid || !formik.values.email}
            >
              Save
            </Button>
            <Button
              className="text-red-600 text-xs"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            className="text-xs"
            onClick={handleEditButtonClick}
          >
            Edit
          </Button>
        )}
      </div>

      <CardContent className=" md:px-12 py-4">
        {editMode ? (
          <div className="space-y-4">
            <Box
              sx={{
                display: "grid",
                gridGap: "5px",
                gridTemplateColumns: {
                  xs: "40vw 40vw",
                  sm: "40vw 40vw",
                  md: "30vw 30vw",
                  lg: "20vw 20vw",
                },
                paddingTop: "10px",
              }}
            >
              <div className="flex flex-col pr-10">
                <p htmlFor="firstName" className="font-semibold mb-1 text-lg">
                  First Name:
                </p>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  className={`border ${
                    formik.errors.firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-8 py-2 w-full`}
                />
                {formik.errors.firstName && (
                  <p className="text-red-500 ml-2  mt-1 text-xs">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex flex-col pr-10">
                <p htmlFor="lastName" className="font-semibold mb-1 text-lg">
                  Last Name:
                </p>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  className={`border ${
                    formik.errors.lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md px-8 py-2 w-full`}
                />
                {formik.errors.lastName && (
                  <p className="text-red-500 ml-2  mt-1 text-xs">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
              <div className="flex flex-col pr-10">
                <p htmlFor="phone" className="font-semibold mb-1 text-lg">
                  Phone:
                </p>
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone"
                  name="phone"
                  onChange={handlePincodeChange}
                  value={formik.values.phone}
                  className={`border ${
                    formik.errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-md px-8 py-2 w-full`}
                />
                {formik.errors.phone && (
                  <p className="text-red-500 ml-2  mt-1 text-xs">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="flex flex-col pr-10">
                <p htmlFor="email" className="font-semibold mb-1 text-lg">
                  Email:
                </p>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={`border ${
                    formik.errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md px-8 py-2 w-full`}
                />
                {formik.errors.email && (
                  <p className="text-red-500 ml-2  mt-1 text-xs">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </Box>
            <div></div>
          </div>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridGap: "10px",
              gridTemplateColumns: {
                xs: "45vw 45vw",
                sm: "40vw 40vw",
                md: "30vw 30vw",
                lg: "20vw 20vw",
              },
              paddingTop: "10px",
            }}
          >
            <div className="flex flex-col pr-10">
              <p className="font-semibold mb-1 text-lg">First Name:</p>
              <p>{user?.first_name}</p>
            </div>
            <div className="flex flex-col pr-10">
              <p className="font-semibold mb-1 text-lg">Last Name:</p>
              <p>{user?.last_name}</p>
            </div>
            <div className="flex flex-col pr-10">
              <p className="font-semibold mb-1 text-lg">Phone:</p>
              <p>{user?.phone}</p>
            </div>
            <div className="flex flex-col pr-10">
              <p className="font-semibold mb-1 text-lg">Email:</p>
              <p>{user?.email}</p>
            </div>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default UpdateUserInfo;
