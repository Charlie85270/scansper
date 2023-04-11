import { CLValueBuilder, decodeBase16 } from "casper-js-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../AppContext";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import Loader from "../../components/shared/Loader/Loader";
import { useGetBlockById } from "../../hooks/useGetBlockById";
import { useGetContractPackage } from "../../hooks/useGetContractPackage";
import { useGetDeployById } from "../../hooks/useGetDeployById";
import {
  getAvatarUrl,
  KNOW_ADDRESSES,
  truncateString,
} from "../../utils/Utils";

export const Search = () => {
  const { validators } = useContext(AppContext);
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  const [accountHash, setAccountHash] = useState("");
  const deployQuery = useGetDeployById(search);
  const contractQuery = useGetContractPackage(search);
  const blockQuery = useGetBlockById(search);
  const knowAddress = KNOW_ADDRESSES.filter(
    val =>
      val.name
        ?.toLocaleLowerCase()
        ?.includes(search.toString().toLocaleLowerCase()) ||
      val.public_key?.toLocaleLowerCase() ===
        search.toString().toLocaleLowerCase()
  );
  const filteredValidator = validators.filter(
    val =>
      val.name
        ?.toLocaleLowerCase()
        ?.includes(search.toString().toLocaleLowerCase()) ||
      val.publicKey?.toLocaleLowerCase() ===
        search.toString().toLocaleLowerCase()
  );
  useEffect(() => {
    if (router.isReady) {
      setIsloading(false);
      const match = router.asPath.match(new RegExp(`[&?]search=(.*?)(&|$)`));
      if (!match) return undefined;
      setSearch(decodeURIComponent(match[1].trim()));
    }
  }, [router]);

  // Search account
  useEffect(() => {
    try {
      setAccountHash(
        search
          ? CLValueBuilder.publicKey(
              decodeBase16(search?.toString() || "").subarray(1),
              decodeBase16(search?.toString() || "")[0]
            ).toAccountRawHashStr()
          : ""
      );
    } catch (err) {}
  }, [search]);

  const noResult =
    !contractQuery.data &&
    filteredValidator.length === 0 &&
    !accountHash &&
    !deployQuery.data &&
    knowAddress.length === 0 &&
    !blockQuery.data;
  return (
    <AppLayout
      title="Casper Network search page"
      desc="Search accounts, validators, blocks, contracts data on the Casper Network"
    >
      <Card>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <p className="flex items-center mb-8 text-gray-400 text-md">
              <span> Result found for : </span>
              <p className="ml-2 font-semibold text-gray-800 truncate ">
                {search}
              </p>
            </p>
            {/* VALIDATORS */}
            {filteredValidator.length > 0 && (
              <div className="mt-6">
                <p className="pb-2 mb-2 text-lg text-gray-800 border-b">
                  {filteredValidator.length} validators
                </p>
                <div>
                  <div>
                    {filteredValidator.map(val => {
                      return (
                        <Link
                          key={val.publicKey}
                          className="flex items-center mt-4 space-x-4 hover:underline"
                          href={`/validator/${val.publicKey}?tab=delegators`}
                        >
                          <img
                            className="w-8 h-8 rounded-lg"
                            src={getAvatarUrl(val.publicKey || "", validators)}
                          />
                          <div className="">
                            <p className="text-gray-700 hover:text-gray-900">
                              {val.name}
                            </p>
                            <p className="text-sm text-gray-400 truncate">
                              {truncateString(val.publicKey || "", 45)}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {/* ACCOUNTS */}
            {(accountHash || knowAddress.length > 0) && (
              <div className="mt-6">
                <p className="text-lg text-gray-800 border-b">
                  {knowAddress.length > 0
                    ? `${knowAddress.length} Accounts`
                    : "Account"}
                </p>
                {accountHash && (
                  <Link
                    key={search}
                    className="flex items-center mt-4 space-x-4 hover:underline"
                    href={`/account/${search}?tab=deploys`}
                  >
                    <img
                      className="w-8 h-8 rounded-lg"
                      src={getAvatarUrl(search || "", validators)}
                    />
                    <div className="">
                      <p className="text-gray-700 hover:text-gray-900">
                        {truncateString(search || "", 35)}
                      </p>
                    </div>
                  </Link>
                )}
                {knowAddress?.map(ad => {
                  return (
                    <Link
                      key={ad.public_key}
                      className="flex items-center mt-4 space-x-4 hover:underline"
                      href={`/account/${ad.public_key}?tab=deploys`}
                    >
                      <img className="w-8 h-8 rounded-lg" src={ad.img} />
                      <div className="">
                        <p className="text-gray-700 hover:text-gray-900">
                          {truncateString(ad.name || "", 35)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            {/* DEPLOY */}
            {deployQuery.data && (
              <div className="mt-6">
                <p className="text-lg text-gray-800 border-b">Deploy</p>

                <Link
                  key={search}
                  className="flex items-center mt-4 space-x-4 hover:underline"
                  href={`/deploy/${search}`}
                >
                  <div className="">
                    <p className="text-gray-700 hover:text-gray-900">
                      {truncateString(search || "", 35)}
                    </p>
                  </div>
                </Link>
              </div>
            )}
            {/* BLOCK */}
            {blockQuery.data && (
              <div className="mt-6">
                <p className="text-lg text-gray-800 border-b">Block</p>

                <Link
                  key={search}
                  className="flex items-center mt-4 space-x-4 hover:underline"
                  href={`/block/${search}?tab=deploys`}
                >
                  <div className="">
                    <p className="text-gray-700 hover:text-gray-900">
                      {truncateString(search || "", 35)}
                    </p>
                  </div>
                </Link>
              </div>
            )}
            {/* CONTRACT */}
            {contractQuery.data && (
              <div className="mt-6">
                <p className="text-lg text-gray-800 border-b">Contract</p>

                <Link
                  key={search}
                  className="flex items-center mt-4 space-x-4 hover:underline"
                  href={`/contract/${search}?tab=deploys`}
                >
                  <div className="">
                    <p className="text-gray-700 hover:text-gray-900">
                      {contractQuery.data.contract_name}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {truncateString(search || "", 35)}
                    </p>
                  </div>
                </Link>
              </div>
            )}{" "}
            {/* NO RESULTS */}
            {noResult && (
              <div className="mt-6">
                <p className="text-lg text-gray-800">No result</p>
              </div>
            )}
          </>
        )}
      </Card>
    </AppLayout>
  );
};

export default Search;
