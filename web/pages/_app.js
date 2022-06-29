import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/roboto"; // Defaults to weight 400.

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
