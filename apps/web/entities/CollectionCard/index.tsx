'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NFTCollectionIDList } from '../../lib/types/nftTypes';
import { ICollection } from '../../lib/types/nftTypes';
import { api } from '../../trpc/react';

const mockedCollectionsQuery = {
  ZkNoid_test: {
    version: 'v3',
    indexName: 'standard-devnet',
    collectionAddress: 'B62qpqH2ae7wrAzvBH31sacj9yTeCvMhz5Hx8obfm9onQrBwBeTkKVE',
  },
  Tileville: {
    version: 'v2',
    indexName: 'mainnet',
    collectionName: 'Tileville',
  },
};

export default function CollectionCard({ collection }: { collection: ICollection }) {
  const { data: collectionItemsData } = api.http.nft.getCollectionsNFT.useQuery({
    collectionName: collection.name,
    collectionAddress: collection.address,
    version: `v${collection.source.version}`,
    indexName: collection.source.indexName,
    page: 0,
    hitsPerPage: 5,
  });
  return (
    <Link
      href={`/nft?collection=${collection.name.toLocaleLowerCase()}`}
      className="cursor-pointer p-[0.781vw] flex flex-col gap-[0.781vw] bg-[#212121] rounded-[0.521vw] hover:scale-95 transition-all duration-300 ease-in-out"
    >
      <div className="w-full flex items-center">
        <span className="text-[1.25vw] font-bold font-museo">{collection.name}</span>
      </div>
      <div className="gap-[0.781vw] grid grid-cols-4 grid-rows-2">
        {collectionItemsData &&
          'nfts' in collectionItemsData &&
          collectionItemsData.nfts.length > 0 &&
          collectionItemsData.nfts.map((nft, index) => (
            <div
              key={index}
              className={
                index == 0
                  ? 'col-span-2 row-span-2 w-full h-full rounded-[0.521vw] overflow-hidden'
                  : 'w-full h-full rounded-[0.521vw] overflow-hidden'
              }
            >
              <Image
                src={nft.image}
                alt={nft.name}
                width={1000}
                height={1000}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
      </div>
      <div className="hover:opacity-80 rounded-[0.521vw] bg-left-accent w-full py-[0.417vw] text-center text-[1.042vw] font-medium text-[#212121] font-museo">
        Show collection
      </div>
    </Link>
  );
}
