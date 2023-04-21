import React, { ReactNode } from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <header></header>
    <ChakraProvider theme={theme}>
      <>{children}</>
    </ChakraProvider>
    <footer></footer>
  </div>
);

export default Layout;
