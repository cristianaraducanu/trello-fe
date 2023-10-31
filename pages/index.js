import * as React from "react";
import Boards from "../components/Boards";
import SignIn from "../components/SignIn";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { user } = React.useContext(UserContext);

  return <div>{user ? <Boards /> : <SignIn />}</div>;
}
