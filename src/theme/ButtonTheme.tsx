import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const navigationButton = defineStyle({
  background: "none",
  color: "#000",
  fontWeight: "500",

  // let's also provide dark mode alternatives
  _active: {
    background: "none",
    color: "#000",
    fontWeight: "700",
    textDecoration: "underline",
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { navigationButton },
});
