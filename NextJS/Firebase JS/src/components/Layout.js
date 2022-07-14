import { useAuth } from "../contexts/AuthContext";
import { useSystem } from "../contexts/SystemContext";

import Nav from "./Nav";
import Footer from "./Footer";

import { Loader } from "@mantine/core";

export default function Layout({ children }) {
  const { loading } = useAuth();
  const { appName, tooling } = useSystem();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Nav appName={appName} />
          <main
            className=" h-96 max-w-4xl min-w-300 m-auto items-center"
            id="main"
          >
            <div>{children}</div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
