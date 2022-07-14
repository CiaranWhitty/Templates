import React, { useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";

import { Button, Modal } from "@mantine/core";

export default function NavModal({ handleClose, modalOpen }) {
  const [formOpen, setFormOpen] = useState(false);

  const closeF = () => {
    setFormOpen(false);
  };
  const openF = () => {
    setFormOpen(true);
  };

  return (
    <>
      <Modal
        centered
        opened={modalOpen}
        onClose={handleClose}
        withCloseButton={false}
      >
        {formOpen ? (
          <SignUp
            formOpen={formOpen}
            handleCloseF={closeF}
            handleOpenF={openF}
          />
        ) : (
          <Login
            formOpen={formOpen}
            handleCloseM={handleClose}
            handleCloseF={closeF}
            handleOpenF={openF}
          />
        )}
        <hr />
        <Button onClick={handleClose} color="red">
          Cancel
        </Button>
      </Modal>
    </>
  );
}
