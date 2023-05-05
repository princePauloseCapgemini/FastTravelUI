import { Routes, Route } from "react-router-dom";

import EntryProvider from "./components/EntryProvider";
import { Layout } from "./components/Layout";
import NotFound from "./components/NotFound";
import Login from "./pages/login/item";
import Signup from "./pages/signup/item";

interface RouteProps {
  element: JSX.Element | JSX.Element[];
}

function Router() {
  const UnRestrictedRoute = ({ element }: RouteProps) => {
    return <Layout title="Fast Travel">{element}</Layout>;
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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
