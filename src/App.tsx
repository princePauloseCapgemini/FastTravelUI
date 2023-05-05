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

console.log('Default react app');

export default App;
