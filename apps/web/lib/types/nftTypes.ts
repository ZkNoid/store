export enum NFTCollectionIDList {
  Zknoid = 'zknoid',
  Tileville = 'tileville',
}

export interface NFTParam {
  key: string;
  value: {
    data: string;
    kind: string;
  };
}

export interface NFT {
  id: string;
  name: string;
  imageType: string; // ipfs
  image: string; // link to ipfs
  owner: string | undefined;
  isMinted: boolean;
  price: number;
  params: NFTParam[];
  collection: string;
  raw: any | undefined | { address: string };
}

export interface NFTCollection<Items = any> {
  id: NFTCollectionIDList;
  items: Items[];
  mintedAmount: number;
  totalPrice: number;
}

// API NFT collection list
export interface ISourceData {
  name: string;
  indexName: string;
  version: number;
}

export interface ICollection {
  name: string;
  count: number;
  source: ISourceData;
  address: string;
}

// NFTZknoid
// export interface NFTZknoid extends NFT {
//   params: [
//     { title: "expertise"; value: "king" | "wizard" | "warrior" | "villager" },
//     { title: "race"; value: "dragon" | "lizard" | "frog" },
//     { title: "rating"; value: "gold" | "bronze" | "silver"; amount: string },
//     { title: "skin"; value: "green" | "black" | "purple" | "red" },
//     { title: "edition"; value: "first" },
//   ];
// }

// export interface NFTCollectionZknoid extends NFTCollection<NFTZknoid> {}

// export type AnyNFTItem = NFTZknoid;
// export type AnyNFTCollection = NFTCollectionZknoid;
