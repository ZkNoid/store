import { createZkNoidGameConfig } from "@zknoid/sdk/lib/createConfig";
import { ZkNoidGameType } from "@zknoid/sdk/lib/platform/game_types";
import { ThimblerigLogic } from "zknoid-chain-dev";
import Thimblerig from "./Thimblerig";
import {
  ZkNoidGameFeature,
  ZkNoidGameGenre,
} from "@zknoid/sdk/lib/platform/game_tags";
import ThimblerigLobby from "./components/ThimblerigLobby";

export const thimblerigConfig = createZkNoidGameConfig({
  id: "thimblerig",
  type: ZkNoidGameType.PVP,
  name: "Thimblerig game",
  description:
    "One player hides a ball behind a thimbler and second player needs to guess which thimbler it was",
  image:
    "https://res.cloudinary.com/dw4kivbv0/image/upload/w_1000,f_auto,q_auto:best/v1/store/games/tzpqopjerumrub7aoy5c",
  genre: ZkNoidGameGenre.Lucky,
  features: [ZkNoidGameFeature.P2P],
  isReleased: true,
  releaseDate: new Date(2024, 2, 25),
  popularity: 0,
  author: "ZkNoid Team",
  rules:
    "1. Two players participate in each round of the game. One player hides a ball under one of three thimbles, and the other player attempts to guess the location of the ball.\n\n2. The hiding player places ball under one of three thimbles trying to confuse the guessing player.\n\n3. The guessing player selects one of the thimbles, trying to guess which thimble conceals the ball.\n\n4.The hiding player then reveals whether the ball is under the chosen",
  runtimeModules: {
    ThimblerigLogic,
  },
  page: Thimblerig,
  lobby: ThimblerigLobby,
});
