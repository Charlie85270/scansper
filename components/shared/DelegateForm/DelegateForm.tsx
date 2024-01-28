import { SendResult } from "@make-software/csprclick-core-client";
import classNames from "classnames";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MOTE_VALUE } from "../../../utils/Utils";
import { withDynamicHook } from "../../layout/NavBar/Account";
import {
  CLPublicKey,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
  decodeBase16,
} from "casper-js-sdk";
import { useGetBalanceFromUref } from "../../../hooks/useGetBalanceFromUref";
import { useGetStatusInfos } from "../../../hooks/useGetStatusInfos";
import { useGetItemFromHashAccount } from "../../../hooks/useGetItemFromHashAccount";
import AppContext from "../../../AppContext";
import DelegationsList from "../DelegationsList/DelegationsList";
import { useRouter } from "next/router";
import ValidatorSelector from "../DelegationsList/ValidatorSelector";

export interface Validator {
  publicKey?: string | undefined;
  name?: string | undefined;
  img?: string | undefined;
  fee?: number | undefined;
}

const config = {
  auction_manager_contract_hash:
    "ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea",
  delegate_cost: "2500000000", // in motes
  undelegate_cost: "10000", // in motes
  redelegate_cost: "10000", // in motes
  transfer_cost: "100000000", // in motes
};

export enum AuctionManagerEntryPoint {
  delegate = "delegate",
  undelegate = "undelegate",
  redelegate = "redelegate",
}

const getAuctionManagerDeployCost = (entryPoint: AuctionManagerEntryPoint) => {
  switch (entryPoint) {
    case AuctionManagerEntryPoint.delegate:
      return config.delegate_cost;
    case AuctionManagerEntryPoint.undelegate:
      return config.undelegate_cost;
    case AuctionManagerEntryPoint.redelegate:
      return config.redelegate_cost;

    default:
      throw Error("getAuctionManagerDeployCost: unknown entry point");
  }
};

export const makeAuctionManagerDeploy = (
  contractEntryPoint: AuctionManagerEntryPoint,
  delegatorPublicKeyHex: string,
  validatorPublicKeyHex: string,
  redelegateValidatorPublicKeyHex: string | null,
  amountMotes: string,
  chainName: string
) => {
  const delegatorPublicKey = CLPublicKey.fromHex(delegatorPublicKeyHex);
  const validatorPublicKey = CLPublicKey.fromHex(validatorPublicKeyHex);
  const newValidatorPublicKey =
    redelegateValidatorPublicKeyHex &&
    CLPublicKey.fromHex(redelegateValidatorPublicKeyHex);

  const deployParams = new DeployUtil.DeployParams(
    delegatorPublicKey,
    chainName
  );

  const args = RuntimeArgs.fromMap({
    delegator: delegatorPublicKey,
    validator: validatorPublicKey,
    amount: CLValueBuilder.u512(amountMotes),
    ...(newValidatorPublicKey && {
      new_validator: newValidatorPublicKey,
    }),
  });

  const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
    decodeBase16(config.auction_manager_contract_hash),
    contractEntryPoint,
    args
  );

  const deployCost = getAuctionManagerDeployCost(contractEntryPoint);

  const payment = DeployUtil.standardPayment(deployCost);

  var deploy = DeployUtil.makeDeploy(deployParams, session, payment);
  var deployJson = DeployUtil.deployToJson(deploy);

  return JSON.stringify(deployJson.deploy);
};

const GAS_PAYMENT = "100000000"; // in motes

const TransferForm = ({ useClickRef }) => {
  const clickRef = useClickRef();

  const router = useRouter();
  const query = router.query;
  const defaultAmount = query.amount;
  const defaultIsDelegate = query.delegate;
  const { validators } = useContext(AppContext);
  const defaultValidatorKey = query.validator;

  const activeAccount = clickRef?.getActiveAccount();

  const [selectedValidator, setSelectedValidator] = useState<Validator>();

  useEffect(() => {
    const defaultValidator = validators.find(
      (val) => val.publicKey === defaultValidatorKey
    );

    if (defaultValidator) {
      setSelectedValidator(defaultValidator);
    }
  }, [defaultValidatorKey, validators]);

  const statusInfos = useGetStatusInfos();
  const public_key = activeAccount?.public_key;

  const stateRootHash =
    statusInfos.data?.result.last_added_block_info.state_root_hash;
  let accountHash = public_key;
  let accountHashKey = public_key;
  try {
    accountHash = public_key
      ? CLValueBuilder.publicKey(
          decodeBase16(public_key?.toString() || "").subarray(1),
          decodeBase16(public_key?.toString() || "")[0]
        ).toAccountRawHashStr()
      : undefined;
    accountHashKey = public_key
      ? CLValueBuilder.publicKey(
          decodeBase16(public_key?.toString() || "").subarray(1),
          decodeBase16(public_key?.toString() || "")[0]
        ).toAccountHashStr()
      : undefined;
  } catch (err) {
    // already an account hash
  }
  const urefData = useGetItemFromHashAccount(
    stateRootHash,
    accountHashKey === public_key
      ? `account-hash-${public_key}`
      : accountHashKey
  );

  const [, updateState] = React.useState();

  //@ts-ignore
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [isLoading, setisLoading] = useState(false);
  const [isDelegate, setIsDelegate] = useState(
    defaultIsDelegate === "false" ? false : true
  );

  const [error, setError] = useState<string>();
  const [deployHash, setDeployHash] = useState<string>();
  const [amount, setAmount] = useState<number>(Number(defaultAmount));

  const uref = urefData.data?.result?.stored_value.Account.main_purse;
  const { data: dataBlance } = useGetBalanceFromUref(stateRootHash, uref);
  const balanceValue = Number(
    Number(Number(dataBlance?.result.balance_value) / MOTE_VALUE).toFixed(0)
  );

  useEffect(() => {
    clickRef?.on("csprclick:signed_in", async (evt) => {
      forceUpdate();
    });
    clickRef?.on("csprclick:signed_out", async (evt) => {
      location.reload();
    });
  }, [clickRef?.on]);

  useEffect(() => {
    setAmount(Number(defaultAmount as string));
  }, [defaultAmount]);

  useEffect(() => {
    setIsDelegate(defaultIsDelegate === "false" ? false : true);
  }, [defaultIsDelegate]);

  const onDelegateClick = () => {
    if (!selectedValidator?.publicKey || !amount || !selectedValidator) {
      return null;
    }

    const deploy = makeAuctionManagerDeploy(
      isDelegate
        ? AuctionManagerEntryPoint.delegate
        : AuctionManagerEntryPoint.undelegate,
      public_key,
      selectedValidator?.publicKey,
      null,
      (amount * MOTE_VALUE).toString(),
      "casper"
    );
    setisLoading(true);
    clickRef
      .send(deploy, public_key)
      .then((res: SendResult | undefined) => {
        if (res?.deployHash) {
          setDeployHash(res.deployHash);
          setAmount(0);
          setSelectedValidator(undefined);
        } else if (res?.cancelled) {
          setError("Sign cancelled");
        } else {
          const err = "Error in send(): " + res?.error + "\n" + res?.errorData;
          setError(err);
        }
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow sm:max-w-xl">
        <div className="px-4 py-8 sm:px-10">
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 text-gray-500 bg-white">
                Delegate / Undelegate casper{" "}
              </span>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
                width="12px"
                alt="cspr"
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center text-xs justify-center gap-8">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={isDelegate}
                  onChange={(e) => {
                    setIsDelegate(e.target.checked);
                    setAmount(0);
                  }}
                  name="delegate"
                  className="w-5 h-5 text-red-600"
                />
                <span className="ml-2 text-gray-700">Delegate</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!isDelegate}
                  onChange={(e) => {
                    setIsDelegate(!e.target.checked);
                    setAmount(0);
                  }}
                  name="delegate"
                  className="w-5 h-5 text-red-600"
                />
                <span className="ml-2 text-gray-700">Undelegate</span>
              </label>
            </div>
            <div
              className="w-full space-y-6"
              key={selectedValidator?.publicKey}
            >
              <ValidatorSelector
                onValidatorChange={setSelectedValidator}
                selectedValidator={selectedValidator}
                validators={validators}
              />
              <div className="w-full">
                <div className="relative">
                  <div className="flex w-full justify-between items-center">
                    <p
                      className="text-gray-500 text-xs
                   bg-white"
                    >
                      Amount (min 500)
                    </p>
                    {public_key && isDelegate && (
                      <button
                        className="underline text-xs
                    bg-white"
                        onClick={() => {
                          setAmount(balanceValue - 2.5);
                        }}
                      >
                        Set max
                      </button>
                    )}
                  </div>

                  <input
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                    }}
                    value={amount}
                    type="number"
                    id="search-form-name"
                    className=" rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:"
                    placeholder="Amount"
                  />
                </div>
              </div>
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    onClick={onDelegateClick}
                    disabled={!activeAccount || !amount || !selectedValidator}
                    type="button"
                    className={classNames(
                      "py-2 flex justify-center items-center px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg",
                      {
                        "opacity-50 cursor-not-allowed":
                          !activeAccount || !amount || !selectedValidator,
                      }
                    )}
                  >
                    {isLoading ? (
                      <>
                        {" "}
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="mr-2 animate-spin"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                        </svg>
                        Loading
                      </>
                    ) : isDelegate ? (
                      "Delegate"
                    ) : (
                      "Undelegate"
                    )}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
          <p className="text-xs flex items-center leading-5 text-gray-500">
            <span className="mr-2">
              Transfer fees : <b>2.5 </b>
            </span>

            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDEuNTMgMjc2Ljk1Ij48ZyBkYXRhLW5hbWU9IkxheWVyIDIiPjxwYXRoIGQ9Ik0yMjcuNTggMjE0LjFhMTQgMTQgMCAwMC0xMy42MyAxMWwtNTIuNjYtMi41NGEyMC4wNiAyMC4wNiAwIDAwLjI2LTMgMTkuNDEgMTkuNDEgMCAwMC0uNzctNS4zN2wxOS4xMi0xMWExNCAxNCAwIDAwMTQgNC43NSAxMy44MSAxMy44MSAwIDAwMTAuNDctMTAuODEgMTQgMTQgMCAxMC0yNi4xMSAzLjUxbC0xOC41NiAxMC42OWExOS4zOSAxOS4zOSAwIDAwLTM1LjgxIDE0Ljc2bC0zNC4zNyA4LjQxQTE5LjM4IDE5LjM4IDAgMDA4NCAyMjJsNi4yLTguNTlhMTQgMTQgMCAwMDE4LjItMTAuOTEgMTQgMTQgMCAxMC0yMSA5LjZsLTUuNjggNy45YTE4Ljg3IDE4Ljg3IDAgMDAtMTQuMS0zLjY2bC01Ljk0LTMzLjg0YTE5LjQgMTkuNCAwIDEwLTEzLjIxLTM2LjEyTDMzLjUyIDExNy4yYTE5LjQgMTkuNCAwIDAwNy43NC03LjFsMTIuNCAzLjI3YTEzLjQgMTMuNCAwIDAwLS4xNiAyIDE0IDE0IDAgMTAuOTEtNC45NGwtMTEuNzEtMy4xYTE5LjI0IDE5LjI0IDAgMDAxLjQ5LTcuNDUgMTkgMTkgMCAwMC0uNTgtNC42MWwzNC40Ni0xNS44M2ExOS4zOSAxOS4zOSAwIDAwMzEuNS0yMi41bDIyLjA5LTIxLjU0YTE5LjIgMTkuMiAwIDAwOSAzdjkuOTJhMTMuOCAxMy44IDAgMTAzIDB2LTkuNmExOS4zOSAxOS4zOSAwIDAwNy44Ni0yLjM0TDE3NS42NyA2NGExOS40MSAxOS40MSAwIDEwMzMuNjggNS4xNmw3LjUzLTQuMjRhMTQgMTQgMCAxMC0xLjY5LTIuNTNsLTcuMDcgNGExOS4zOSAxOS4zOSAwIDAwLTMwLjQyLTQuNjZMMTU0IDM0LjY5YTE5LjY2IDE5LjY2IDAgMDA1LjU0LTYuODhsMjAuNzIgMy40NWExMy45NCAxMy45NCAwIDEwLS4zNC0zLjEzbC0xOS4yNi0zLjJhMTkuNCAxOS40IDAgMTAtMzEuNTEgOC45MkwxMDcuNzIgNTQuOGExOS4zMiAxOS4zMiAwIDAwLTEzLjA5LTYuNThWMzMuNTVhMTMuOCAxMy44IDAgMTAtMyAwVjQ3LjlhMTkuMzYgMTkuMzYgMCAwMC0xNS4yOSAyOUw0Mi42OCA5Mi4zOGExOS41OSAxOS41OSAwIDAwLTUuNTQtNy40NUw1MC4zMiA2MS4zYTEzLjIxIDEzLjIxIDAgMDA5LS43MSAxNC4xMyAxNC4xMyAwIDAwOC40Ni0xMS40MSAxNCAxNCAwIDEwLTIwLjI4IDExbC0xMi44MiAyM2ExOS40IDE5LjQgMCAxMC0zLjkzIDM1LjE3TDQ1LjkgMTQ4YTE5LjQyIDE5LjQyIDAgMDAtNy40NiAxMS42NmwtMTEtMy4yNGExMy4wNSAxMy4wNSAwIDAwLS44Mi05IDE0LjE2IDE0LjE2IDAgMDAtMTEuNDYtOC4zMiAxNCAxNCAwIDEwMTEuMjIgMjAuMTdsMTEuNyAzLjQ1di44NWExOS4zNyAxOS4zNyAwIDAwOC45IDE2LjNsLTcuNTEgOS44NWExNCAxNCAwIDEwMi4wNSAyLjI4bDguMTMtMTAuNjdhMTkuMzIgMTkuMzIgMCAwMDcuOCAxLjY0Yy40MSAwIC44MiAwIDEuMjItLjA2bDYgMzQuMDVhMTkuNCAxOS40IDAgMTAyMC44OCAzMC40MWwyOC4wOSAxMi41YTEzLjEzIDEzLjEzIDAgMDAuOTIgOC44MiAxNC4xMSAxNC4xMSAwIDAwMTEuNCA4LjIzQTE0IDE0IDAgMTAxMTQuNjMgMjU3bC0yNy40MS0xMi4yM2ExOS40MSAxOS40MSAwIDAwMi4yMi03LjE1bDM1LjY5LTguNzNhMTkuMzggMTkuMzggMCAwMDI5IDUuODlsMTMuMzYgMTEuNTNhMTQgMTQgMCAxMDEuNTctMi42NGwtMTIuNy0xMWExOS41MiAxOS41MiAwIDAwNC4yLTcuMTNsNTMuMDYgMi41NmExMy45NSAxMy45NSAwIDEwMTMuOTQtMTR6IiBmaWxsPSIjZmYwMDEyIiBkYXRhLW5hbWU9IkxheWVyIDEiLz48L2c+PC9zdmc+"
              width="12px"
              alt="cspr"
            />
          </p>
          {error && <p className="text-xs leading-5 text-gray-500">{error}</p>}
          {!activeAccount && (
            <p className="text-xs leading-5 text-red-500">
              You must be signed in to send CSPR tokens
            </p>
          )}
          {deployHash && (
            <p className="text-xs leading-5 text-gray-700">
              Transaction sent successfully :{" "}
              <span className="text-xl test-underline leading-5 text-green-500">
                <Link href={"/deploy/" + deployHash}>See deploy</Link>
              </span>
            </p>
          )}
        </div>
      </div>
      <p className="my-4 text-xl ">My delegations </p>
      {public_key?.toString() && (
        <DelegationsList
          isAccount
          balance={balanceValue}
          accountHash={public_key?.toString()}
        />
      )}
    </div>
  );
};

export default withDynamicHook(
  "useClickRef",
  () => import("@make-software/csprclick-ui"),
  TransferForm
);
