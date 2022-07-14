import React from "react";
import { useSystem } from "../contexts/SystemContext";


export default function Footer() {
  const { appName } = useSystem();

  var d = new Date();
  var currentYear = d.getFullYear();

  return (
    <>
      <hr />
      <div>
        <time>{currentYear}</time> © {appName}
      </div>
    </>
  );
}
