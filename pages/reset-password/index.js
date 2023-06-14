import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
//
import { RiLoaderFill } from "react-icons/ri";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter an email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 characters."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const [userExist, setUserExist] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSent1, setEmailSent1] = useState("fgbfg");
  const [isLoading, setIsLoading] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(60);

  const router = useRouter();
  const { control, formState, handleSubmit, setError, setValue, getValues } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const users = useSelector((state) => state.users);
  const { email } = getValues();

  const { errors } = formState;

  useEffect(() => {
    setUserExist("");
    setEmailSent1("");
  }, [email]);

  const onSubmit = async () => {
    setIsLoading(true);
    setEmailSent1("");
    const { email } = getValues();
    console.log(email);
    if (email) {
      try {
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/reset-password-link",
          {
            email: email,
          }
        );
        setEmailSent1(response.data.message);
        setIsLoading(false);
        console.log(emailSent);
        handleResendLink();
      } catch (error) {
        setUserExist("User Not exists");
        setIsLoading(false);
        setTimeout(() => {
          setUserExist("");
        }, 3000);
      }
    }
    if (!email) {
      setIsLoading(false);
    }
  };

  const handleResendLink = () => {
    setEmailSent(true);
    setTimerSeconds(60);

    const intervalId = setInterval(() => {
      setTimerSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setTimeout(() => {
      setEmailSent(false);
      clearInterval(intervalId);
    }, 60000);
  };

  useEffect(() => {
    setValue("email", "");
  }, []);

  return (
    <>
      <div className="md:flex flex-col sm:flex-row items-center justify-center text-center flex-1 min-w-0 bg-white m-3">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0 lg:w-1/4 h-full flex flex-col justify-center">
          <img className="w-48 m-auto mt-32 mb-3" src="/logo.png" alt="logo" />
          <p className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Reset Password
          </p>
          <p className="text-gray-500 mt-8">
            Please Provide Your Registered Email Address
          </p>
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-1">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              {userExist && <span className="text-red-800">{userExist}</span>}
              {emailSent1 && <p className="text-green-600">{emailSent1}</p>}
            </div>
            <Button
              variant="contained"
              className={`m-auto mt-4 ${
                emailSent
                  ? "bg-green-500"
                  : errors
                  ? "bg-gray-800"
                  : "bg-gray-300"
              } text-xs rounded-2xl pt-3 pb-3`}
              aria-label="Send Verification Link"
              disabled={!!errors.email || emailSent}
              type="submit"
              size="large"
              onClick={onSubmit}
            >
              {emailSent
                ? `Resend Link (${timerSeconds})`
                : "Send Verification Link"}
            </Button>
            <p className="text-gray-400 text-xs mt-8">
              An email will be sent to your registered email address if you are
              an existing customer with us. In case you have not registered,
              kindly go to
              <a href="https://tradingmaterials.com/" className="text-blue-700">
                Home Page
              </a>
              and create a new account.
            </p>
          </form>
        </div>

        <div className="fixed bottom-0 p-10 border-t-2">
          CopyRight© 2023 All rights are Reserved by Trading Materials
        </div>
      </div>

      {isLoading && (
        <div className="text-center absolute w-full h-full z-10 items-center justify-center flex flex-col  top-0 bg-bg">
          <RiLoaderFill size="55px" className="rotate" />
          <p className="mt-[-80px]">Loading...</p>
        </div>
      )}
    </>
  );
}

export default SignInPage;
