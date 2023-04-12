import Link from "next/link";
import React, { useEffect } from "react";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { useRouter } from "next/router";
import { pageSize } from "../../../services/httpReq";

import NFTCollectionCard from "../Card/NFTCollectionCard/NFTCollectionCard";
import { useGetCasperLiveNFTByAccount } from "../../../hooks/useGetCasperLiveNFTByAccount";
import Pager from "../Table/Pager";

interface DeployListProps {
  accountHash?: string;
  isAccount?: boolean;
}

const NFTCasperLiveList = ({ accountHash }: DeployListProps) => {
  const { push, query } = useRouter();

  const { page } = query;
  const nftCsprLive = useGetCasperLiveNFTByAccount(accountHash, page);

  const items = nftCsprLive.data?.data;
  useEffect(() => {
    nftCsprLive.refetch();
  }, [page]);
  // Error state
  if (nftCsprLive.error || (!items && !nftCsprLive.isFetching)) {
    return <ErrorMessage />;
  }

  if (items?.length === 0 && nftCsprLive.isFetched) {
    return <p className="p-4">No result</p>;
  }

  const totalItems = nftCsprLive?.data?.itemCount;
  const nftName = (meta: any) => {
    return meta?.name || meta?.find(data => data.key === "name")?.value;
  };
  const nftNImg = (meta: any) => {
    return meta?.token_uri || meta?.find(data => data.key === "image")?.value;
  };

  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 gap-4 mt-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items?.map((nft, index) => {
          return (
            <NFTCollectionCard
              key={nft.token_id + index}
              target="_self"
              href={`/contract-package/${nft.contract_package_hash}`}
              title={`${nftName(nft?.metadata)} - ${nft.token_id}`}
              image={nftNImg(nft?.metadata)}
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

export default NFTCasperLiveList;
