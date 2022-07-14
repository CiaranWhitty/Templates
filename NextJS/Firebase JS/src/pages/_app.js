import React, { useEffect, useState } from "react";
import Router from "next/router";

import { SnackbarProvider } from "notistack";

import AuthProvider from "../contexts/AuthContext";
import SysProvider from "../contexts/SystemContext";

import Layout from "../components/Layout";

import { Loader } from "@mantine/core";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SnackbarProvider maxSnack={3}>
      <SysProvider>
        <AuthProvider>
          <Layout>{loading ? <Loader /> : <Component {...pageProps} />}</Layout>
        </AuthProvider>
      </SysProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
