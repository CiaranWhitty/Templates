import React, { useState } from "react";
import Link from "next/link";

import { useAuth } from "../contexts/AuthContext";

import NavModal from "./NavModal";

import { Drawer, Button, Group, Menu, ActionIcon, Title } from "@mantine/core";

import { Settings, Menu2, UserCircle, Logout } from "tabler-icons-react";

export default function Nav({ appName }) {
  const { currentUser, currentUserEV, logout } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const closeM = () => {
    setModalOpen(false);
  };
  const openM = () => {
    setModalOpen(true);
  };

  async function handleLogout() {
    try {
      await logout();
    } catch {}
  }

  // For Drawer
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Navigation"
        padding="md"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Group direction="column">
          <Link href={`/`} passHref>
            <Button
              color="gray"
              radius="md"
              size="lg"
              fullWidth
              onClick={() => setOpened(false)}
            >
              Home
            </Button>
          </Link>

          {currentUser && currentUserEV && (
            <>
              <hr />
              <Link href={`/dashboard`} passHref>
                <Button
                  color="gray"
                  radius="md"
                  size="lg"
                  fullWidth
                  onClick={() => setOpened(false)}
                >
                  DashBoard
                </Button>
              </Link>
            </>
          )}

          <Link href={`/things`} passHref>
            <Button
              color="gray"
              radius="md"
              size="lg"
              fullWidth
              onClick={() => setOpened(false)}
            >
              Things
            </Button>
          </Link>
        </Group>
      </Drawer>
      <div className="flex flex-row items-center justify-between max-w-4xl min-w-300 m-auto">
        <Group>
          <ActionIcon
            color="dark"
            variant="hover"
            size="xl"
            onClick={() => setOpened(true)}
          >
            <Menu2 size={28} />
          </ActionIcon>
          <Link href={"/"}>
            <a className="hover:text-gray-500">
              <Title order={4}>{appName}</Title>
            </a>
          </Link>
        </Group>
        <Group>
          {currentUser && currentUserEV ? (
            <Menu
              control={
                <ActionIcon color="dark" size="xl" variant="hover">
                  <UserCircle size={28} />
                </ActionIcon>
              }
            >
              <Link href={`/dashboard`} passHref>
                <Menu.Item icon={<Settings size={20} />}>DashBoard</Menu.Item>
              </Link>
              <Link href={`/`} passHref>
                <Menu.Item
                  color="red"
                  onClick={handleLogout}
                  icon={<Logout size={20} />}
                >
                  Logout
                </Menu.Item>
              </Link>
            </Menu>
          ) : (
            <ActionIcon
              color="dark"
              size="xl"
              variant="hover"
              onClick={() => (modalOpen ? closeM() : openM())}
            >
              <UserCircle size={28} />
            </ActionIcon>
          )}
        </Group>
      </div>
      <NavModal modalOpen={modalOpen} handleClose={closeM} />
    </>
  );
}
