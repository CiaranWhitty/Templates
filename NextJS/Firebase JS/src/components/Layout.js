import { useAuth } from "../contexts/AuthContext";
import { useSystem } from "../contexts/SystemContext";

import Nav from "./Nav";
import Footer from "./Footer";
import LoggedOut from "./LoggedOut";

import { Loader } from "@mantine/core";

export default function Layout({ children }) {
  const { loading, currentUserState } = useAuth();
  const { appName } = useSystem();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Nav appName={appName} />
          {currentUserState ? (
            <>
              <main
                className=" max-w-4xl min-w-300 m-auto items-center"
                id="main"
              >
                <div>{children}</div>
              </main>
            </>
          ) : (
            <>
              <LoggedOut />
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}
