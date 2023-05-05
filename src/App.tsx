import { Box } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import Router from "./routes";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Box>
  );
}

export default App;
