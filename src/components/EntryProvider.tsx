import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function EntryProvider() {
  const jwt = Cookies.get("jwt");

  if (jwt) {
    return <Navigate to="/book-a-trip" replace={true} />;
  }

  return <Navigate to="/login" replace={true} />;
}
