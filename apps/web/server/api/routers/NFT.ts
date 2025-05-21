import { CollectionInfo, NftInfo } from '@silvana-one/api';
import { createTRPCRouter, publicProcedure } from '../trpc';

import { searchClient } from '@algolia/client-search';
import { z } from 'zod';
import { ICollection, ISourceData, NFT } from '../../../lib/types/nftTypes';

const { NEXT_PUBLIC_NFT_ALGOLIA_PROJECT, NEXT_PUBLIC_NFT_ALGOLIA_KEY } = process.env;
if (NEXT_PUBLIC_NFT_ALGOLIA_PROJECT === undefined)
  throw new Error('NEXT_PUBLIC_NFT_ALGOLIA_PROJECT is undefined');
if (NEXT_PUBLIC_NFT_ALGOLIA_KEY === undefined)
  throw new Error('NEXT_PUBLIC_NFT_ALGOLIA_KEY is undefined');

const client = searchClient(NEXT_PUBLIC_NFT_ALGOLIA_PROJECT, NEXT_PUBLIC_NFT_ALGOLIA_KEY);

const HITS_PER_PAGE = 20;

const indexes: ISourceData[] = [
  {
    name: 'mainnetV2',
    indexName: 'mainnet',
    version: 2,
  },
  // {
  //   name: "zekoV3",
  //   indexName: "standard-zeko",
  //   version: 3,
  // },
  // {
  //   name: 'devnetV3',
  //   indexName: 'standard-devnet',
  //   version: 3,
  // },
];

export interface AlgoliaCollectionList {
  hits: CollectionInfo[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: { nbHits: boolean; typo: boolean };
  processingTimeMS: number;
}

export interface AlgoliaNftList {
  hits: NftInfo[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: { nbHits: boolean; typo: boolean };
  processingTimeMS: number;
}

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

// const getNFT = async (indexName: string, version: string, address: string) => {
//   const result = await client.searchSingleIndex({
//     indexName,
//     searchParams: {
//       facetFilters: [`address:${address}`],
//     },
//   });

//   if (!result) return undefined;

//   const tokenList = result?.hits ? (result as unknown as AlgoliaNftList) : undefined;

//   if (!tokenList) return undefined;

//   return {
//     id: tokenList?.hits[0].tokenId,
//     name: tokenList?.hits[0].name,
//     imageType: tokenList?.hits[0].collectionBaseURL,
//     image: tokenList?.hits[0].image,
//     owner: tokenList?.hits[0].owner,
//     isMinted: true, // All NFT-s from algolia are minted
//     price: tokenList?.hits[0].price,
//     params: getNFTParams(tokenList?.hits[0], version),
//     collection: (tokenList?.hits[0] as any).collection,
//     raw: tokenList?.hits[0],
//   } as NFT;
// };

const getNFTs = async (
  indexName: string,
  version: string,
  facetFilters: string[],
  page: number,
  hitsPerPage?: number
) => {
  const result = await client.searchSingleIndex({
    indexName,
    searchParams: {
      query: '',
      hitsPerPage: hitsPerPage ?? HITS_PER_PAGE,
      facetFilters,
      page: page,
    },
  });

  if (!result) return [];

  const tokenList = result?.hits ? (result as unknown as AlgoliaNftList) : undefined;

  return {
    nfts:
      tokenList?.hits.map(hit => {
        return {
          id: hit.tokenId,
          name: hit.name,
          imageType: hit.collectionBaseURL,
          image: hit.image,
          owner: hit.owner,
          isMinted: true, // All NFT-s from algolia are minted
          price: hit.price,
          params: getNFTParams(hit, version),
          collection: (hit as any).collection,
          raw: hit,
        } as NFT;
      }) ?? [],
    meta: {
      page: tokenList?.page ?? 0,
      totalPages: tokenList?.nbPages ?? 0,
    },
  };
};

////////////////////////////// V2 //////////////////////////////

const getV2Collections = async (source: ISourceData): Promise<ICollection[]> => {
  const result = await client.searchForFacetValues({
    indexName: source.indexName,
    facetName: 'collection',
    searchForFacetValuesRequest: {
      facetQuery: '',
      maxFacetHits: 100, // up to 100, NOT 1000
    },
  });

  if (!result) return [];

  return result.facetHits
    .filter(hit => hit.count > 5)
    .map(hit => {
      return {
        name: hit.value,
        count: hit.count,
        source,
        address: 'B62qs2NthDuxAT94tTFg6MtuaP1gaBxTZyNv9D3uQiQciy1VsaimNFT',
      };
    });
};

const getV2NFTs = async (
  indexName: string,
  collectionName: string,
  page: number,
  hitsPerPage?: number
) => {
  return getNFTs(indexName, 'v2', [`collection:${collectionName}`], page, hitsPerPage);
};

const getUserV2NFTs = async (address: string, page: number, hitsPerPage?: number) => {
  const v2Indexes = indexes.filter(v => v.version === 2).map(v => v.indexName);

  let result: NFT[] = [];

  for (const indexName of v2Indexes) {
    const curNFTs = await getNFTs(indexName, 'v2', [`owner:${address}`], page, hitsPerPage);

    if (curNFTs && 'nfts' in curNFTs) {
      result.push(...curNFTs.nfts);
    }
  }

  return result;
};

////////////////////////////// V3 //////////////////////////////

const getV3Collections = async (source: ISourceData): Promise<ICollection[]> => {
  const result = await client.searchSingleIndex({
    indexName: source.indexName,
    searchParams: {
      query: '',
      hitsPerPage: HITS_PER_PAGE,
      facetFilters: ['status:created', 'contractType:collection'],
    },
  });

  if (!result) return [];

  const tokenList = result?.hits ? (result as unknown as AlgoliaCollectionList) : undefined;

  return tokenList!.hits.map(hit => {
    return {
      name: hit.collectionName,
      count: 1,
      source,
      address: hit.collectionAddress,
    };
  });
};

const getV3NFTs = async (
  indexName: string,
  collectionAddress: string,
  page: number,
  hitsPerPage?: number
) => {
  return getNFTs(
    indexName,
    'v3',
    ['contractType:nft', `collectionAddress:${collectionAddress}`],
    page,
    hitsPerPage
  );
};

const getUserV3NFTs = async (address: string, page: number, hitsPerPage?: number) => {
  const v2Indexes = indexes.filter(v => v.version === 3).map(v => v.indexName);

  let result: NFT[] = [];

  for (const indexName of v2Indexes) {
    const curNFTs = await getNFTs(
      indexName,
      'v3',
      ['contractType:nft', `owner:${address}`],
      page,
      hitsPerPage
    );

    if (curNFTs && 'nfts' in curNFTs) {
      result.push(...curNFTs.nfts);
    }
  }

  return result;
};

export const nftRouter = createTRPCRouter({
  getCollections: publicProcedure.query(async () => {
    const result = [];

    for (const source of indexes) {
      let collections: ICollection[] = [];

      if (source.version === 2) {
        collections = await getV2Collections(source);
      } else if (source.version === 3) {
        collections = await getV3Collections(source);
      }

      result.push(...collections);
    }

    return result;
  }),
  getCollectionsNFT: publicProcedure
    .input(
      z.object({
        version: z.string(),
        indexName: z.string(),
        collectionAddress: z.string().optional(),
        collectionName: z.string().optional(),
        page: z.number(),
        hitsPerPage: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      if (input.version === 'v2') {
        return await getV2NFTs(
          input.indexName,
          input.collectionName!,
          input.page,
          input.hitsPerPage
        );
      } else if (input.version === 'v3') {
        return await getV3NFTs(
          input.indexName,
          input.collectionAddress!,
          input.page,
          input.hitsPerPage
        );
      }
    }),

  getUserNFTs: publicProcedure
    .input(
      z.object({
        address: z.string(),
        page: z.number(),
        hitsPerPage: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      let result: NFT[] = [];

      const v2NFTs = await getUserV2NFTs(input.address, input.page, input.hitsPerPage);
      const v3NFTs = await getUserV3NFTs(input.address, input.page, input.hitsPerPage);

      result.push(...v2NFTs);
      result.push(...v3NFTs);

      return result;
    }),
});
