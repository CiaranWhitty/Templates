import { useState } from "react";

import { Button } from "@mantine/core";

import NavModal from "./NavModal";

export default function LoggedOut() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeM = () => {
    setModalOpen(false);
  };
  const openM = () => {
    setModalOpen(true);
  };

  return (
    <>
      <h1>You are Currently Logged Out</h1>
      <Button component="a" onClick={() => (modalOpen ? closeM() : openM())}>
        Login
      </Button>
      <NavModal modalOpen={modalOpen} handleClose={closeM} />
    </>
  );
}
