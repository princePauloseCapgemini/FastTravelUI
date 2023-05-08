import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./InputTheme";

const colors = {
  primary: "#424a54",
  grey: "#666",
  white: "#fff",
  black: "#000",
};

const theme = extendTheme({ colors, components: { Input: inputTheme } });

export default theme;
