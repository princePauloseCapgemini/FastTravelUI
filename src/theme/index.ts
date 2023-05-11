import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./ButtonTheme";
import { inputTheme } from "./InputTheme";
import { selectTheme } from "./selectTheme";

const colors = {
  primary: "#424a54",
  grey: "#666",
  white: "#fff",
  black: "#000",
};

const theme = extendTheme({
  colors,
  components: { Input: inputTheme, Button: buttonTheme , Select: selectTheme, DatePicker: inputTheme },
});

export default theme;
