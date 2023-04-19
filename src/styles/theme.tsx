import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "100": "#d1d2dc",
      "50": "#eeeef2",
    },
    blue: {
      "600": "#3e13bf",
      "500": "#4d4dff",
    },
  },
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.900",
      },
    },
  },
  components: {},
});
