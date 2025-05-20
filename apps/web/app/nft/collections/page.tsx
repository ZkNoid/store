'use client';

import { NFTCollectionIDList } from '../../../lib/types/nftTypes';
import { api } from '../../../trpc/react';
import CollectionCard from '../../../entities/CollectionCard';
import NFTCollectionCarousel from '../../../sections/NFTCollectionCarousel';

export default function CollectionsPage() {
  const { data: collections } = api.http.nft.getCollections.useQuery();

  return (
    <div className={'w-full'}>
      <NFTCollectionCarousel />
      <section
        className={
          'mx-[4.706vw] lg:!mx-auto lg:!w-[62.5vw] mt-[8.235vw] lg:!mt-[2.604vw] mb-[35.294vw] lg:!mb-[7.813vw] flex flex-col gap-[4.706vw] lg:!gap-[0.781vw]'
        }
      >
        <span className="text-[1.667vw] font-medium font-museo">NFT Collections</span>
        <div className="grid grid-cols-2 gap-[0.781vw]">
          {collections &&
            collections
              // Sort Zknoid to the top
              .sort((a, b) => {
                if (a.name.toLowerCase() === NFTCollectionIDList.Zknoid) return -1;
                if (b.name.toLowerCase() === NFTCollectionIDList.Zknoid) return 1;
                return 0;
              })
              .map((collection, index) => <CollectionCard key={index} collection={collection} />)}
        </div>
      </section>
    </div>
  );
}
