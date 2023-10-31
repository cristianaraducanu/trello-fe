import { useEffect } from "react";
import { TITLE } from "../constants";

export default function useTitle(page = "") {
  useEffect(() => {
    if (page) {
      document.title = `${TITLE} | ${page}`;
    }
  }, [page]);
}
