import Meta from "../../components/Meta";
import ItemList from "../../components/ItemList";

export default function Index({ things }) {
  return (
    <>
      <Meta
        title="Things"
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
      <div>
        <h1>Things</h1>
        <ItemList items={things} page="Things" />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let res;
  let things;

  res = await fetch(`${process.env.NEXT_PUBLIC_CLOUD_FUNCTION_API_URL}/things`);
  things = await res.json();

  return {
    props: {
      things,
    },
  };
}
