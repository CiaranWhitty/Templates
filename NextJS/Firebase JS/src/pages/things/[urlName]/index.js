import Link from "next/link";
import { useRouter } from "next/router";

import { Loader } from "@mantine/core";

import ThingsPage from "../../../components/ThingsPage";

export default function Index({ items }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  let publicItems = items;

  return (
    <>
      <Link href={`/things/`} passHref>
        <h2>(Go Back)</h2>
      </Link>

      {publicItems.length === 0 && <h2>Items Not Available</h2>}

      {publicItems.map((data) => (
        <div key={data.uId}>
          <ThingsPage item={data} />
        </div>
      ))}
    </>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLOUD_FUNCTION_API_URL}/things/${context.params.urlName}`
  );
  const items = await res.json();

  return {
    props: {
      items,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLOUD_FUNCTION_API_URL}/things/`
  );
  const data = await res.json();

  const paths = data.map((i) => {
    return {
      params: {
        urlName: i.urlName,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
