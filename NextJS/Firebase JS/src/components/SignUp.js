import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { appCheck } from "../config/firebase";
import { getToken } from "firebase/app-check";

import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";

import { TextInput, Paper, Button, PasswordInput } from "@mantine/core";

export default function SignUp({ formOpen, handleCloseF, handleOpenF }) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [signUpVer, setSignUpVer] = useState(false);
  const [values, setValues] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const fNameC = values.fName.trim();
    const lNameC = values.lName.trim();
    const emailC = values.email.trim();
    const passwordC = values.password.trim();
    const passwordConfirmC = values.confirmPassword.trim();
    let message = "";
    let res = null;

    let appCheckTokenReponse;
    try {
      appCheckTokenReponse = await getToken(appCheck, false);
    } catch (err) {
      // console.log("err", err);
      return;
    }

    try {
      setLoading(true);
      if (fNameC === "") {
        throw (message = "Please Enter A First Name");
      }
      if (lNameC === "") {
        throw (message = "Please Enter A Last Name");
      }
      if (emailC === "") {
        throw (message = "Please Enter An Email");
      }
      if (
        emailC.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
      ) {
        throw (message = "Invalid Email");
      }
      if (passwordC === "") {
        throw (message = "Please Enter A Password");
      }
      if (passwordC.length < 6) {
        throw (message = "Passwords Must Have 6 Charaters or More");
      }
      if (passwordC !== passwordConfirmC) {
        throw (message = "Passwords Do Not Match");
      }

      await signup(
        emailRef.current.value.trim(),
        passwordRef.current.value.trim()
      )
        .then(async (obj) => {
          const uId = uuidv4();
          res = await fetch(
            `${process.env.NEXT_PUBLIC_CLOUD_FUNCTION_API_URL}/user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Firebase-AppCheck": appCheckTokenReponse.token,
              },
              body: JSON.stringify({
                uId: uId,
                email: emailC,
                fName: fNameC,
                lName: lNameC,
              }),
            }
          );

          setSignUpVer(true);
          enqueueSnackbar("Congratulations Account created", {
            variant: "success",
          });
          return await res.json();
        })
        .catch((err) => {
          // console.log("01", err);
          enqueueSnackbar(err.code, {
            variant: "error",
          });
        });
      setLoading(false);
    } catch (err) {
      // console.log("02", err);
      enqueueSnackbar(err, {
        variant: "error",
      });
    }

    setLoading(false);
  }

  return (
    <>
      {signUpVer ? (
        <h2>
          Please Verify Your Email: <br /> {values.email}
        </h2>
      ) : (
        <>
          <form>
            <h2 id="transition-modal-title">SignUp</h2>
            <p>
              Returning user?{" "}
              <Button
                onClick={() => (formOpen ? handleCloseF() : handleOpenF())}
                color={"orange"}
              >
                Login
              </Button>
            </p>
            <div>
              <div>
                <TextInput
                  label="First Name"
                  placeholder="John"
                  onChange={handleChange("fName")}
                />
                <TextInput
                  label="Last Name"
                  placeholder="Doe"
                  onChange={handleChange("lName")}
                />
              </div>
              <TextInput
                ref={emailRef}
                label="Email"
                placeholder="email@email.com"
                onChange={handleChange("email")}
              />
              <PasswordInput
                ref={passwordRef}
                label="Password"
                placeholder="*******"
                value={values.password}
                onChange={handleChange("password")}
              />
              <PasswordInput
                ref={passwordConfirmRef}
                label="Repeat Password"
                placeholder="*******"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
            </div>
            <div>
              <Button onClick={handleSubmit} disabled={loading}>
                Sign Up
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
