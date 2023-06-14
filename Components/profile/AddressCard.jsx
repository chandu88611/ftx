import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "@/store/loaderSlice";
import { setAlert } from "@/store/alertSlice";
import axios from "axios";
function AddressCard() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const [primary, setToPrimary] = useState(false);
  const [del, setDel] = useState(false);
  const [id, setId] = useState("");
  const updatePrimaryAddress = async () => {
    const token = localStorage.getItem("tmToken");
    dispatch(setLoader(true));
    try {
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/client/make-primary-address",
        {
          address_id: id,
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
      dispatch(setLoader(false));
    }
  };
  const handleDelete = async () => {
    dispatch(setLoader(true));
    const token = localStorage.getItem("tmToken");

    try {
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/client/remove/address",
        {
          address_id: id,
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
    }
  };
  return (
    <div>
      {user?.address.length > 0 && (
        <p className="text-xl font-bold">Secondary Addresses</p>
      )}
      <Box
        sx={{
          display: "grid",
          gridGap: "10px",
          gridTemplateColumns: {
            xs: "80vw ",
            sm: "45vw 45vw",
            md: "35vw 35vw ",
            lg: "25vw 25vw 25vw",
          },
          paddingLeft: "10px",
          paddingTop: "10px",
        }}
      >
        {user?.address &&
          user?.address.map((add, index) => (
            <div key={index} className="p-10 shadow m-3">
              <div className="flex justify-between">
                <p className="text-xl font-semibold text-green-600 pt-2 pb-2">
                  Address {index + 1}
                </p>

                {add.status != "1" ? (
                  <MdOutlineDelete
                    size={"30px"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (add.status === "1") {
                        return;
                      }
                      setId(add.id);
                      console.log(id);
                      setDel(true);
                    }}
                  />
                ) : (
                  <Button
                    variant="contained"
                    className="bg-blue-600 text-white m-2 cursor-none"
                  >
                    Primary
                  </Button>
                )}
              </div>
              <p className="text-lg font-semibold py-2">
                {add.status === "1" ? (
                  ""
                ) : (
                  <p className="text-sm">Set to primary Address</p>
                )}
              </p>

              {add.status === "1" ? (
                ""
              ) : (
                <FormGroup>
                  <FormControlLabel
                    checked={add.status === "1"}
                    control={
                      <Switch
                        onChange={() => {
                          if (add.status === "1") {
                            return;
                          }
                          setId(add.id);
                          console.log(id);
                          setToPrimary(true);
                        }}
                      />
                    }
                    label=""
                  />
                </FormGroup>
              )}
              <p className="pl-3 text-gray-500 m-3 capitalize">
                {add.add_1}
                {add.addressLine2},{add.city}, {add.state}
                <br />
                {add.country}-{add.zip}
              </p>
            </div>
          ))}
      </Box>

      {primary && (
        <Box className=" fixed top-0 left-0 w-full h-full z-[100] bg-bg flex items-center justify-center p-4 ">
          <div className="w-full sm:w-[60vw] md:w-[50vw] lg:w-[50vw] xl:w-[30vw] bg-white p-5 rounded-lg shadow-xl">
            <p className="text-xl  text-center font-semibold p-2">Alert</p>
            <hr />
            <p className="text-lg font-normal text-center p-2">
              You are Changing Your Primary Address
            </p>
            <div className="flex justify-center gap-5 p-2 mt-2">
              <Button variant="outlined" onClick={updatePrimaryAddress}>
                Confirm
              </Button>
              <Button
                variant="outlined"
                style={{ color: "red", borderColor: "red" }}
                onClick={() => setToPrimary(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      )}

      {del && (
        <Box className=" fixed top-0 left-0 w-full h-full z-[100] bg-bg flex items-center justify-center p-4  ">
          <div className="w-full sm:w-[60vw] md:w-[50vw] lg:w-[50vw] xl:w-[30vw] bg-white p-5 rounded-lg shadow-xl">
            <p className="text-xl  text-center font-semibold p-2">Alert</p>
            <hr />
            <p className=" text-lg  text-center p-2 ">
              Are You Sure want to delete
            </p>
            <div className="flex justify-center gap-5 p-2 mt-2">
              <Button
                variant="outlined"
                onClick={handleDelete}
                style={{ color: "red", borderColor: "red" }}
              >
                Confirm{" "}
              </Button>
              <Button variant="outlined" onClick={() => setDel(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}

export default AddressCard;
