import { searchClient } from '@algolia/client-search';
import { useEffect, useRef, useState } from 'react';
import { InstantSearch, useInstantSearch, useSearchBox, Configure } from 'react-instantsearch';
import { NFT } from '../../lib/types/nftTypes';

const algoliaClient = searchClient(
  process.env.NEXT_PUBLIC_NFT_ALGOLIA_PROJECT!,
  process.env.NEXT_PUBLIC_NFT_ALGOLIA_KEY!
);

const getNFTParams = (hit: any, version: string) => {
  if (version === 'v2') {
    return Object.entries(hit.properties).map(([k, v]) => ({
      key: k,
      value: v,
    }));
  } else if (version === 'v3') {
    return hit.metadata.traits;
  }
};

function SearchBox({
  setItems,
  version,
  setMeta,
  setSearchStatus,
}: {
  setItems: (items: NFT[]) => void;
  version: string;
  setMeta: (meta: { page: number; totalPages: number }) => void;
  setSearchStatus: (status: 'idle' | 'loading' | 'stalled' | 'error') => void;
}) {
  const { query, refine } = useSearchBox();
  const { results, status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounce = 300;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== query) {
        refine(inputValue);
      }
    }, debounce);

    return () => clearTimeout(timer);
  }, [inputValue, debounce]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (results && query) {
      setItems(
        results.hits.map((hit) => ({
          id: hit.tokenId,
          name: hit.name,
          imageType: hit.collectionBaseURL,
          image: hit.image,
          owner: hit.owner,
          isMinted: true,
          price: hit.price,
          params: getNFTParams(hit, version),
          collection: (hit as any).collection,
          raw: hit,
        }))
      );
      setMeta({
        page: results.page,
        totalPages: results.nbPages,
      });
    }
    if (!query) {
      setItems([]);
    }
  }, [results, query]);

  useEffect(() => {
    console.log('status', status);
    setSearchStatus(status);
  }, [status]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setInputValue('');
    refine('');
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        'lg:!col-span-7 col-span-2 row-start-1 bg-bg-grey rounded-[2.353vw] lg:!rounded-[0.521vw] p-[4.706vw] lg:!p-[0.781vw] flex flex-row justify-between items-center gap-[2.353vw] lg:!gap-[0.521vw]'
      }
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={'w-[5.647vw] lg:!w-[1.25vw] h-[5.647vw] lg:!h-[1.25vw]'}
      >
        <g opacity="0.5">
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="#F9F8F4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.0031 21.0002L16.7031 16.7002"
            stroke="#F9F8F4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <input
        className={
          'w-full placeholder:font-plexsans placeholder:text-[3.765vw] placeholder:lg:!text-[0.833vw] placeholder:text-foreground/50 placeholder:leading-[110%] font-plexsans text-[3.765vw] lg:!text-[0.833vw] text-foreground leading-[110%] bg-transparent outline-none'
        }
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={'Search...'}
        aria-label="Search"
      />
    </form>
  );
}

export default function Search({
  collection,
  setSearchedItems,
  setSearchedMeta,
  setSearchStatus,
  page,
}: {
  collection: {
    indexName: string;
    version: string;
    collectionAddress?: string;
    collectionName?: string;
  };
  setSearchedItems: (items: NFT[]) => void;
  setSearchedMeta: (meta: { page: number; totalPages: number }) => void;
  setSearchStatus: (status: 'idle' | 'loading' | 'stalled' | 'error') => void;
  page: number;
}) {
  return (
    <InstantSearch searchClient={algoliaClient} indexName={collection.indexName}>
      <Configure
        facetFilters={
          collection.version === 'v2'
            ? [`collection:${collection.collectionName!}`]
            : ['contractType:nft', `collectionAddress:${collection.collectionAddress!}`]
        }
        hitsPerPage={20}
        page={page}
      />
      <SearchBox
        setItems={setSearchedItems}
        version={collection.version}
        setMeta={setSearchedMeta}
        setSearchStatus={setSearchStatus}
      />
    </InstantSearch>
  );
}
