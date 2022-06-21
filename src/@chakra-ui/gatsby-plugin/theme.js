import { extendTheme } from "@chakra-ui/react";
const theme = {
  styles: {
    global: (props) => ({
      body: {
        bg: "red.500",
      },
    }),
  },

  config: {
    disableTransitionOnChange: false,
  },
};

export default extendTheme(theme);
