import Link from "next/link";

export default function ThingsItems({ item }) {
  // console.log(item);
  return (
    <>
      <div className=" bg-gray-300 m-3 p-3 rounded ">
        <Link href={`/things/${item.urlName}`}>
          <a className="hover:text-gray-500">
            <h1>{item.name}</h1>
          </a>
        </Link>
      </div>
    </>
  );
}
