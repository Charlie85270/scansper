import { CSPRClickSDK } from "@make-software/csprclick-core-client";
import classNames from "classnames";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { getAvatarUrl } from "../../../utils/Utils";

export function withDynamicHook(hookName, importFunc, Component) {
  return props => {
    const [hook, setHook] = useState();

    useEffect(() => {
      importFunc().then(mod => setHook(() => mod[hookName]));
    }, []);

    if (!hook) {
      return null;
    }

    const newProps = { ...props, [hookName]: hook };
    return <Component {...newProps} />;
  };
}

const Account = ({ useClickRef }) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const clickRef = useClickRef();

  const activeAccount = clickRef?.getActiveAccount();

  return activeAccount ? (
    <li
      key={time}
      className="text-secondary pl-10  text-base flex items-center justify-between pr-8 hover:background-app"
    >
      <Link
        href={`/account/${activeAccount.public_key}?tab=deploys`}
        className={classNames(
          "relative flex items-center justify-start py-4 w-full"
        )}
      >
        <img
          key={activeAccount.public_key}
          className="w-6 h-6  mr-4 rounded-full"
          src={getAvatarUrl(activeAccount.public_key || "")}
        />
        My account
      </Link>
    </li>
  ) : null;
};

export default withDynamicHook(
  "useClickRef",
  () => import("@make-software/csprclick-ui"),
  Account
);
