import React from "react";

import { useGetTrandingNFTCollections } from "../../../hooks/useGetTrandingNFTCollections";
import NFTCollectionCard, {
  NFTCollectionCardSkeleton,
} from "../../shared/Card/NFTCollectionCard/NFTCollectionCard";
import ErrorMessage from "../../shared/ErrorMessage/ErrorMessage";

const LinearNFTCollection = () => {
  const queryNFT = useGetTrandingNFTCollections();

  const items = queryNFT.data;

  // Loading state
  if (queryNFT.isLoading) {
    return (
      <div className="flex pb-4 space-x-4 overflow-x-scroll overflow-y-hidden flex-nowrap">
        {[0, 1, 2, 3].map(_ => (
          <div className="flex-none w-72 h-96">
            <NFTCollectionCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (queryNFT.error || !items?.data) {
    return <ErrorMessage />;
  }

  return (
    <div className="flex pb-4 space-x-4 overflow-x-scroll overflow-y-hidden flex-nowrap">
      {items.data.map(({ _id, collection }) => (
        <div className="flex-none w-72">
          <NFTCollectionCard
            href={`https://www.friendly.market/nfts/collection/${_id}`}
            holders={collection.ownersCount}
            totalItems={collection.numberOfItems}
            title={collection.collectionName}
            image={collection.image || undefined}
            verified={collection.isVerified}
            key={_id}
            floor={collection.floor || null}
          />
        </div>
      ))}
    </div>
  );
};

export default LinearNFTCollection;
