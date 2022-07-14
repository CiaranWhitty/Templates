import Meta from "../components/Meta";
import ItemList from "../components/ItemList";
import { Title } from "@mantine/core";

export default function Home({ things }) {
  return (
    <>
      <Meta
        title="Home"
        keywords=""
        description=""
        ogTitle=""
        ogDescription=""
        ogImage=""
        ogUrl=""
        twitterTitle=""
        twitterDescription=""
        twitterImage=""
      />
      <Title order={1}>Home</Title>
    </>
  );
}
