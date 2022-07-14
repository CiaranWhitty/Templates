import { useSnackbar } from "notistack";

import Meta from "./Meta";

export default function ThingsPage({ item }) {
  return (
    <>
      <Meta
        title={item.name}
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
        <h1>{item.name}</h1>
      </div>
    </>
  );
}
