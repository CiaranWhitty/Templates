import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

import { appCheck } from "../config/firebase";
import { getToken } from "firebase/app-check";

import Meta from "../components/Meta";
import CurrentlyLoggedOut from "../components/CurrentlyLoggedOut";

export default function Dashboard() {
  const { currentUser, currentUserEV, currentUserEmail } = useAuth();
  let users;
  let usersName;

  const [usersList, setUsersList] = useState([]);
  const getUsers = async () => {
    let appCheckTokenReponse;
    let AuthEmail;
    try {
      appCheckTokenReponse = await getToken(appCheck, false);
      AuthEmail = await currentUserEmail;
    } catch (err) {
      // console.log("err", err);
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLOUD_FUNCTION_API_URL}/users`,
      {
        method: "GET",
        headers: {
          "X-Firebase-AppCheck": appCheckTokenReponse.token,
          "X-Auth-Email": AuthEmail,
        },
      }
    );
    const users = await res.json();
    return users;
  };
  useEffect(() => {
    getUsers()
      .then((o) => {
        setUsersList(o);
        return;
      })
      .catch((err) => {
        // console.log("Error:", err);
      });
  }, [currentUserEmail]); // eslint-disable-line
  users = usersList;

  usersName = useMemo(() =>
    users.map((i) => {
      return i.name;
    })
  );

  return (
    <>
      <Meta
        title="Dashboard"
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
      {currentUser && currentUserEV ? (
        <>
          <h1>Dashboard</h1>
          {usersName && <h4>Welcome Back - {usersName}</h4>}
          <div className="w-fit m-auto">
            <Link href="/things" passHref>
              <a className="hover:text-gray-500">
                <h2>*Things*</h2>
              </a>
            </Link>
          </div>
        </>
      ) : (
        <CurrentlyLoggedOut />
      )}
    </>
  );
}
