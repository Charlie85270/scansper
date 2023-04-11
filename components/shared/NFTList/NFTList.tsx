import Link from "next/link";
import React, { useEffect } from "react";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { useRouter } from "next/router";
import { pageSize } from "../../../services/httpReq";

import NFTCollectionCard from "../Card/NFTCollectionCard/NFTCollectionCard";
import { useGetFriendlyMarketNFTByAccount } from "../../../hooks/useGetFriendlyMarketNFTByAccount";
import Pager from "../Table/Pager";

interface DeployListProps {
  accountHash?: string;
  isAccount?: boolean;
}

const NFTList = ({ accountHash }: DeployListProps) => {
  const { push, query } = useRouter();

  const { page } = query;

  const nftQuery = useGetFriendlyMarketNFTByAccount(accountHash, page);

  const items = nftQuery.data?.data;
  useEffect(() => {
    nftQuery.refetch();
  }, [page]);
  // Error state
  if (nftQuery.error || (!items && !nftQuery.isFetching)) {
    return <ErrorMessage />;
  }

  if (items?.length === 0 && nftQuery.isFetched) {
    return <p className="p-4">No result</p>;
  }

  const totalItems = nftQuery?.data?.length;

  return (
    <div className="pt-4">
      <p className="italic">
        NB : Only collections registered on Friendly.Market will appears
      </p>
      <div className="grid grid-cols-1 gap-4 mt-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items?.map((nft, index) => {
          return (
            <NFTCollectionCard
              key={nft.tokenID + index}
              target="_self"
              href={`/contract/${nft.contractHash}`}
              title={`${nft.name} - ${nft.tokenID}`}
              image={nft.imageURL}
            />
          );
        })}
      </div>
      <div className="p-6">
        <Pager
          totalItems={totalItems || 0}
          pageSize={pageSize || 10}
          currentPage={Number(page?.toString()) || 1}
          onChangePage={page => {
            push({ query: { ...query, page } }, undefined, {
              shallow: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default NFTList;
