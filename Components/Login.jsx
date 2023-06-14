import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import * as yup from "yup";
// import _ from '@lodash';
import { useRouter } from "next/router";

import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// import { addUser } from './userSlice.js';
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { control, formState, handleSubmit, setError, setValue, getValues } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });
  const [error, setError1] = useState("");
  // MyComponent.js
  const users = useSelector((state) => state.users);

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue("email", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("password", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [setValue]);

  useEffect(() => {
    console.log(users);
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    const { email, password } = getValues();
    console.log(email, password);
    try {
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const { token } = response.data;
      console.log(response);
      document.cookie = `token=${token}; path=/`;
      localStorage.setItem("tmToken", token);

      console.log(token);
      router.push("/dashboard");
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
      setError1(error.response.data.message);
    }
  };
  return (
    <div className="md:flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0 bg-white">
      <div className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-10 sm:p-38  md:p-10 sm:rounded-2xl md:rounded-none shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0 lg:w-1/2 h-full">
          <img className="w-48 m-auto md:m-0" src="/logo.png" alt="logo" />

          <p className="mt-20 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </p>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-20 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-12">
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
                  autoComplete="email"

                    // sx={{ fontSize: '4rem' }}
                  />
                )}
              />
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  autoComplete="current-password"
                  required
                  fullWidth
                  sx={{ fontSize: "1.5rem" }} // Adjust the font size as per your preference
                />
              )}
            />
            {error && <p className="text-xs pl-2 pt-2 text-red-600">{error}</p>}
            <div className="flex  sm:flex-row items-center justify-center sm:justify-between p-3 text-blue-800">
              <Link href="/reset-password">Forgot Pasword? </Link>
            </div>

            <button
              variant="contained"
              className="w-full mt-8 bg-purple-500 text-2xl rounded-3xl p-2 text-white"
              aria-label="Sign in"
              disabled={!isValid}
              type="submit"
              size="large"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-screen p-10 lg:px-10 overflow-hidden"
        sx={{ backgroundColor: "rgb(17, 24, 39)" }}
      >
        <svg
          className="absolute inset-0 pointer-events-none h-full w-full"
          viewBox="0 0 960 540"
          preserveAspectRatio="xMidYMax slice"
        >
          <Box
            component="g"
            sx={{ color: "primary.light" }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: "primary.light" }}
          viewBox="0 0 220 192"
          width="100%"
          height="100%"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-4xl font-bold leading-10 text-gray-100 capitalize">
            <div>We have a created a secured </div>
            <div>application for your comfort</div>
          </div>
          <div className="mt-14 text-xl  text-gray-400">
            Login to see all latest order and transaction of your account and
            ask to our support desk for any queries related to
            <Link href={"https://www.tradingmaterials.com"}>
              
              www.tradingmaterials.com.
            </Link>
          </div>
          <div className="flex items-center mt-16">
            <div className="ml-1 font-medium tracking-tight text-gray-400">
              This application is best viewed in chrome latest version.
            </div>
          </div>
        </div>
      </Box>
      {isLoading && (
        <div className="fixed top-0 w-full left-0 h-full flex items-center justify-center  bg-bg z-[1000] flex-col gap-1 px-10">
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
      )}
    </div>
  );
}

export default SignInPage;
