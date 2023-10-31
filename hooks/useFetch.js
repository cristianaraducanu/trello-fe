import { useRouter } from "next/router";
import { useContext } from "react";
import { API } from "../constants";
import { UserContext } from "../context/UserContext";

export default function useFetch() {
  const { logout, token } = useContext(UserContext);
  const router = useRouter();

  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  };

  const handler = (res) => {
    if (res.ok) return res.json();
    if (res.status === 401) {
      logout();
      router.push("/");
      alert("Please log in first!");
    }
  };

  const get = (path) => fetch(`${API}${path}`, { headers }).then(handler);
  const post = (path, data) =>
    fetch(`${API}${path}`, {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(handler);
  const put = (path, data) =>
    fetch(`${API}${path}`, {
      headers,
      method: "PUT",
      body: JSON.stringify(data),
    }).then(handler);
  const _delete = (path) =>
    fetch(`${API}${path}`, { headers, method: "DELETE" });

  return { get, post, put, _delete };
}
