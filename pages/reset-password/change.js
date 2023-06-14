import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { useRef } from "react";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
// AiFillEye

export default function ResetPasswordPage() {
  const inputRefs = useRef([]);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [showpass, setShowPass] = useState(false);
  const [showOtp, setShowOtp] = useState(true);
  const [error, setError] = useState(false);
  const [done, setDone] = useState("");
  const showpassword = () => {
    setShow(!show);
  };

  const showpassword1 = () => {
    setShow1(!show1);
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required.")
      .min(8,"At least 6 characters long.")
      .max(15,"Password must be at Max 15 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm Password is required."),
  });
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    if (!sessionStorage.getItem("resetEmailPasswordHash")) {
      router.push("/login");
    }
  }, []);
  const resetPassword = async () => {
    setIsLoading(true);
    console.log("ehbh");
    const { password, confirmPassword } = formik.values;
    const res = await axios.post(
      "https://admin.tradingmaterials.com/api/reset/password",
      {
        hash:sessionStorage.getItem("resetEmailPasswordHash"),
        password: password,
        confirm_password: confirmPassword,
      }
    );
    console.log(res);
    if (res.status) {
      setDone(res.message);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: () => {
     
    },
  });

  const handleInputChange = (index, event) => {
    setError("");

    const input = event.target;
    const value = input.value.replace(/\D/g, "");

    if (event.key === "Backspace" && index > 0 && !value) {
      event.preventDefault();
      inputRefs.current[index - 1].focus(); // Move focus to the previous input
      return;
    }

    input.value = value; // Update the input value

    if (value && index < 3) {
      inputRefs.current[index + 1].focus(); // Move focus to the next input
    }

    if (index === 3 && value) {
      const concatenatedValue = inputRefs.current
        .map((ref) => ref.value)
        .join(""); // Concatenate all input values
      console.log(concatenatedValue);
      // Send POST request using Axios
      axios
        .post("https://admin.tradingmaterials.com/api/verify/otp", {
          otp: concatenatedValue,
          hash: sessionStorage.getItem("resetEmailPasswordHash"),
        })
        .then((response) => {
          console.log(response);
          setShowPass(true);
          setShowOtp(false);
        })
        .catch((error) => {
          setError("Enter valid OTP");
          console.log(error);
        });
    }
  };

  return (
    <div className="md:flex flex-col sm:flex-row items-center justify-center text-center flex-1 min-w-0 bg-white">
      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : isLinkExpired ? (
        <div>
          <p>Link expired.</p>
        </div>
      ) : (
        <div>
          <div className="">
            <img
              className="w-48 m-auto mt-32 mb-3"
              src="/logo.png"
              alt="logo"
            />

            <form onSubmit={formik.handleSubmit}>
              {showOtp && (
                <div className="flex justify-center items-center flex-col ">
                  <p className="text-2xl font-bold tracking-tight leading-tight mb-5">
                    Enter OTP
                  </p>
                  <div className="flex">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="text"
                        maxLength="1"
                        inputMode="numeric"
                        pattern="\d*"
                        className="w-12 h-12 text-center border border-gray-300 rounded-lg mx-2 outline-none"
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    ))}
                  </div>
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {showpass && (
                <div className="fadeIn flex flex-col items-center">
                  <p className="text-2xl font-bold tracking-tight leading-tight mb-5">
                    Change password
                  </p>

                  <div className="mb-4 relative  ">
                    <label htmlFor="password" className="block mb-2">
                      New Password
                    </label>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      pattern="[0-9]*"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={`border ${
                        formik.errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md px-8 py-2`}
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
                  <div className="mb-4 relative ">
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
                      } rounded-md px-8 py-2`}
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
                    onClick={resetPassword}
                  >
                    Reset Password
                  </button>
                  <p className="text-center text-green-600">{done}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="text-center absolute w-full h-full z-10 items-center justify-center flex flex-col  top-0 bg-white">
          <img src="/Loading_icon.gif" />
          <p className="mt-[-80px]">Loading...</p>
        </div>
      )}
    </div>
  );
}
