import { Button, HStack } from "@chakra-ui/react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

import EntryProvider from "./components/EntryProvider";
import { Layout } from "./components/Layout";
import NotFound from "./components/NotFound";
import BookTrip from "./pages/book-trip";
import Bookings from "./pages/bookings";
import Login from "./pages/login/item";
import Signup from "./pages/signup/item";

interface RouteProps {
  element: JSX.Element | JSX.Element[];
}

function Router() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const JWT = Cookies.get("jwt");

  const UnRestrictedRoute = ({ element }: RouteProps) => {
    if (JWT) return <Navigate to="/book-a-trip" replace={true} />;

    return (
      <Layout title="Fast Travel" bgImage="/cab.jpg">
        {element}
      </Layout>
    );
  };

  const RestrictedRoute = ({ element }: RouteProps) => {
    if (!JWT) return <Navigate to="/login" replace={true} />;

    return (
      <Layout
        title="Fast Travel"
        rightElement={
          <HStack ml="8" spacing="0">
            <Button
              onClick={() => navigate("book-a-trip")}
              isActive={pathname === "/book-a-trip"}
              variant="navigationButton"
            >
              Book a trip
            </Button>
            <Button
              onClick={() => navigate("bookings")}
              isActive={pathname === "/bookings"}
              variant="navigationButton"
            >
              Bookings List
            </Button>
          </HStack>
        }
      >
        {element}
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<EntryProvider />} />

      <Route
        path="/login"
        element={<UnRestrictedRoute element={<Login />} />}
      />
      <Route
        path="/signup"
        element={<UnRestrictedRoute element={<Signup />} />}
      />

      <Route
        path="/book-a-trip"
        element={<RestrictedRoute element={<BookTrip />} />}
      />

      <Route
        path="/bookings"
        element={<RestrictedRoute element={<Bookings />} />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
