import ThingsItems from "./ThingsItems";
import ThingsPage from "./ThingsPage";

export default function Item({ item, page, setImg }) {
  return (
    <>
      {page === "ProductPage" && <ThingsPage item={item} />}
      {page === "Things" && <ThingsItems item={item} />}
    </>
  );
}
