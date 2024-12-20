import { createZkNoidGameConfig } from "@zknoid/sdk/lib/createConfig";
import { ZkNoidGameType } from "@zknoid/sdk/lib/platform/game_types";
import {
  ZkNoidGameFeature,
  ZkNoidGameGenre,
} from "@zknoid/sdk/lib/platform/game_tags";

export const tileVilleConfig = createZkNoidGameConfig({
  id: "tileville",
  type: ZkNoidGameType.SinglePlayer,
  name: "Tileville game",
  description:
    "TileVille is a strategic city-building game on the Mina blockchain, where players construct and manage their own cities on the island of Nicobar using hexagonal tiles.",
  image:
    "https://res.cloudinary.com/dw4kivbv0/image/upload/w_1000,f_auto,q_auto:best/v1/store/games/jpcx3qtsrg7gzqiyi6rc",
  genre: ZkNoidGameGenre.Arcade,
  features: [ZkNoidGameFeature.SinglePlayer],
  isReleased: true,
  releaseDate: new Date(2024, 2, 25),
  popularity: 0,
  author: "Satyam Bansal",
  rules: "",
  runtimeModules: {},
  page: undefined as any,
  lobby: undefined as any,
  externalUrl: "https://www.tileville.xyz/",
});
