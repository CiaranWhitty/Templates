import { useContext, useState, createContext } from "react";

const SysContext = createContext();

export function useSystem() {
  return useContext(SysContext);
}

export default function SysProvider(props) {
  const [loading, setLoading] = useState(true);
  const [appName, setappName] = useState("Firebase App NextJS");

  const value = { appName, setappName, loading };

  return (
    <SysContext.Provider value={value}>
      {/* {!loading && props.children} */}
      {props.children}
    </SysContext.Provider>
  );
}
