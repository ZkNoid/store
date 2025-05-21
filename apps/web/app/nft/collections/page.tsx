'use client';

import { ICollection, NFTCollectionIDList } from '../../../lib/types/nftTypes';
import { api } from '../../../trpc/react';
import CollectionCard from '../../../entities/CollectionCard';
import NFTCollectionCarousel from '../../../sections/NFTCollectionCarousel';
import { useEffect, useState } from 'react';

const priorityCollections = [
  {
    name: 'zknoid',
    weight: 10,
  },
  {
    name: 'tileville',
    weight: 7,
  },
  {
    name: 'minaty',
    weight: 9,
  },
  {
    name: 'zeko',
    weight: 8,
  },
];

export default function CollectionsPage() {
  const { data: collections } = api.http.nft.getCollections.useQuery();

  const [sortedCollections, setSortedCollections] = useState<ICollection[]>([]);
  useEffect(() => {
    if (collections) {
      let topCollections = collections.filter(collection =>
        priorityCollections.some(pc => {
          console.log(
            pc.name.toLocaleLowerCase(),
            collection.name.toLocaleLowerCase(),
            pc.name.toLocaleLowerCase() === collection.name.toLocaleLowerCase()
          );
          return pc.name.toLocaleLowerCase() === collection.name.toLocaleLowerCase();
        })
      );
      let otherCollections = collections.filter(
        collection =>
          !priorityCollections.some(
            pc => pc.name.toLocaleLowerCase() === collection.name.toLocaleLowerCase()
          )
      );
      topCollections.sort((a, b) => {
        const weightA =
          priorityCollections.find(pc => pc.name.toLocaleLowerCase() === a.name.toLocaleLowerCase())
            ?.weight || 0;
        const weightB =
          priorityCollections.find(pc => pc.name.toLocaleLowerCase() === b.name.toLocaleLowerCase())
            ?.weight || 0;
        return weightB - weightA;
      });

      console.log(topCollections, otherCollections);
      setSortedCollections([...topCollections, ...otherCollections]);
    }
  }, [collections]);

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
          {sortedCollections &&
            sortedCollections
              // .filter(
              //   (collection) =>
              //     collection.name.toLocaleLowerCase() === NFTCollectionIDList.Zknoid ||
              //     collection.name.toLocaleLowerCase() === NFTCollectionIDList.Tileville
              // )
              .map((collection, index) => <CollectionCard key={index} collection={collection} />)}
        </div>
      </section>
    </div>
  );
}
