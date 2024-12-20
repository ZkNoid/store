import { IGame } from "@/app/constants/games";
import {
  compare,
  GAME_STORE_SORT_METHODS,
  GameComparisonType,
} from "@zknoid/sdk/lib/comparators/gameComparator";
import {
  ALL_GAME_TAGS,
  ZkNoidGameFeature,
  ZkNoidGameGenre,
} from "@zknoid/sdk/lib/platform/game_tags";
import { ZkNoidEventType } from "@zknoid/sdk/lib/platform/game_events";
import { useState } from "react";
import GameStoreFilters from "../../widgets/GameStoreFilters";
import SortByFilter from "../../entities/SortByFilter";
import { cn } from "@zknoid/sdk/lib/helpers";
import GameCard from "../../widgets/GameCard";

export default function GameStore({
  games,
  sortBy,
  setSortBy,
  genresSelected,
  setGenresSelected,
  featuresSelected,
  setFeaturesSelected,
  eventTypesSelected,
  setEventTypesSelected,
}: {
  games: IGame[];
  sortBy: GameComparisonType;
  setSortBy: (sortBy: GameComparisonType) => void;
  genresSelected: ZkNoidGameGenre[];
  setGenresSelected: (genresSelected: ZkNoidGameGenre[]) => void;
  featuresSelected: ZkNoidGameFeature[];
  setFeaturesSelected: (featuresSelected: ZkNoidGameFeature[]) => void;
  eventTypesSelected: ZkNoidEventType[];
  setEventTypesSelected: (eventTypesSelected: ZkNoidEventType[]) => void;
}) {
  const PAGINATION_LIMIT = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredGames = games.filter((x) => {
    if (genresSelected.length == 0 && featuresSelected.length == 0) return true;
    if (genresSelected.includes(x.genre)) return true;
    if (x.features.some((feature) => featuresSelected.includes(feature)))
      return true;
  });

  const renderGames = filteredGames.slice(
    (currentPage - 1) * PAGINATION_LIMIT,
    currentPage * PAGINATION_LIMIT,
  );

  return (
    <div
      id={"games"}
      className={"mt-[3.646vw] flex h-full w-full flex-row gap-[0.625vw]"}
    >
      <GameStoreFilters
        genresSelected={genresSelected}
        setGenresSelected={setGenresSelected}
        featuresSelected={featuresSelected}
        setFeaturesSelected={setFeaturesSelected}
      />
      <div className={"flex w-full flex-col"}>
        <div className={"flex w-full flex-row items-center justify-between"}>
          <span
            className={"font-museo text-[1.667vw] font-bold text-foreground"}
          >
            Games
          </span>
          <SortByFilter
            sortMethods={GAME_STORE_SORT_METHODS}
            sortBy={sortBy}
            setSortBy={setSortBy}
            className={"hidden lg:block"}
          />
        </div>
        <div className={"mt-[0.417vw] flex w-full flex-row gap-[0.781vw]"}>
          {ALL_GAME_TAGS.map((tag, index) => (
            <button
              key={index}
              className={cn(
                "cursor-pointer rounded-[0.26vw] border border-foreground px-[0.521vw] py-[0.26vw] text-center font-plexsans text-[0.833vw] text-foreground",
                genresSelected == tag.genres && featuresSelected == tag.features
                  ? "border-left-accent bg-left-accent text-bg-dark"
                  : "hover:border-left-accent hover:text-left-accent",
              )}
              onClick={() => {
                if (
                  genresSelected == tag.genres &&
                  featuresSelected == tag.features
                ) {
                  setGenresSelected([]);
                  setFeaturesSelected([]);
                } else {
                  setGenresSelected(tag.genres);
                  setFeaturesSelected(tag.features);
                }
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className={"mt-[1.302vw] grid w-full grid-cols-3 gap-[0.781vw]"}>
          {renderGames
            .sort((a, b) => compare(a, b, sortBy))
            .map((game) => (
              <GameCard
                game={game}
                key={game.id}
                color={
                  game.genre === ZkNoidGameGenre.BoardGames
                    ? 1
                    : game.genre === ZkNoidGameGenre.Arcade
                      ? 2
                      : 3
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}
