import React from "react";

import { useGetTrandingNFTCollections } from "../../../hooks/useGetTrandingNFTCollections";
import NFTCollectionCard from "../Card/NFTCollectionCard/NFTCollectionCard";

const LinearNFTCollection = () => {
  const queryNFT = useGetTrandingNFTCollections();

  const items = queryNFT.data;
  if (!items) {
    return null;
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
