import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "notistack";

import { TextInput, Button, PasswordInput } from "@mantine/core";

export default function Login({
  formOpen,
  handleCloseF,
  handleCloseM,
  handleOpenF,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    let message = "";
    const emailC = emailRef.current.value.trim();
    const passwordC = passwordRef.current.value.trim();

    try {
      setLoading(true);
      if (emailC === "") throw (message = "Please Enter An Email");
      if (
        emailC.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
      )
        throw (message = "Invalid Email");
      if (passwordC === "") throw (message = "Please Enter A Password");

      await login(
        emailRef.current.value.trim(),
        passwordRef.current.value.trim(),
        handleCloseM
      );

      setLoading(false);
    } catch (err) {
      enqueueSnackbar(err, {
        variant: "error",
      });
    }
    setLoading(false);
  }

  return (
    <form>
      <h2>Login</h2>
      <p>
        No Account?{" "}
        <Button
          onClick={() => (formOpen ? handleCloseF() : handleOpenF())}
          color={"orange"}
        >
          Sign Up
        </Button>
      </p>
      <div>
        <TextInput label="Email" placeholder="email@email.com" ref={emailRef} />
        <PasswordInput
          label="Password"
          placeholder="*******"
          ref={passwordRef}
          onChange={handleChange("password")}
        />
      </div>
      <div>
        <Button onClick={handleSubmit} disabled={loading}>
          Login
        </Button>
      </div>
    </form>
  );
}
