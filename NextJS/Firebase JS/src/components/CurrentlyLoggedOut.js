import { Button } from "@mantine/core";

export default function CurrentlyLoggedOut() {
  return (
    <>
      <h1>You are Currently Logged Out</h1>
      <Button component="a" href="/">
        Go Back
      </Button>
    </>
  );
}
