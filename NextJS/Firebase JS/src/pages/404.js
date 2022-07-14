import { useRouter } from "next/router";
import Meta from "../components/Meta";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <Meta title="404 - Page Not Found" />
      <div>
        <h2 onClick={() => router.back()}>Go Back</h2>
        <h1 onClick={() => router.back()}>404 - Page Not Found</h1>
      </div>
    </>
  );
}
