import classNames from "classnames";
import { Html, Head, Main, NextScript } from "next/document";
import React, { useContext } from "react";
import AppContext from "../AppContext";

export default function MyDocument() {
  const { isOpenMenu } = useContext(AppContext);
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
