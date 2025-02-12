import { createZkNoidGameConfig } from "@zknoid/sdk/lib/createConfig";
import { ZkNoidGameType } from "@zknoid/sdk/lib/platform/game_types";
import { RandzuLogic } from "zknoid-chain-dev";
import Randzu from "./Randzu";
import {
  ZkNoidGameFeature,
  ZkNoidGameGenre,
} from "@zknoid/sdk/lib/platform/game_tags";
import RandzuLobby from "./components/RandzuLobby";

export const randzuConfig = createZkNoidGameConfig({
  id: "randzu",
  type: ZkNoidGameType.PVP,
  name: "Randzu game",
  description:
    "Two players take turns placing pieces on the board attempting to create lines of 5 of their own color",
  image:
    "https://res.cloudinary.com/dw4kivbv0/image/upload/w_1000,f_auto,q_auto:best/v1/store/games/rtlpxkdv5oy5gpeh77if",
  genre: ZkNoidGameGenre.BoardGames,
  features: [ZkNoidGameFeature.Multiplayer],
  isReleased: true,
  releaseDate: new Date(2024, 0, 1),
  popularity: 50,
  author: "ZkNoid Team",
  rules:
    "Randzu is a game played on a 15x15 grid, similar to tic-tac-toe. Two players take turns placing their mark, using balls of different colors. The goal is to get five of your marks in a row, either horizontally, vertically or diagonally.",
  runtimeModules: {
    RandzuLogic,
  },
  page: Randzu,
  lobby: RandzuLobby,
});
