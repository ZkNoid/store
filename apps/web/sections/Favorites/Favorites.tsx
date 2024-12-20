import {
  ALL_GAME_TAGS,
  ZkNoidGameGenre,
} from "@zknoid/sdk/lib/platform/game_tags";
import { cn } from "@zknoid/sdk/lib/helpers";
import { useContext, useState } from "react";
import SortByFilter from "../../entities/SortByFilter";
import GameCard from "../../widgets/GameCard";
import {
  GAME_STORE_SORT_METHODS,
  GameComparisonType,
  compare,
} from "@zknoid/sdk/lib/comparators/gameComparator";
import { IGame } from "@/app/constants/games";
import Lottie from "react-lottie";
import SnakeNoEvents from "../../lib/assets/ZKNoid_Snake_Intro_03_05.json";
import SetupStoreContext from "../../../../packages/sdk/lib/contexts/SetupStoreContext";

export default function Favorites({ games }: { games: IGame[] }) {
  const PAGINATION_LIMIT = 8;

  const { favorites } = useContext(SetupStoreContext);

  const [genresSelected, setGenresSelected] = useState<ZkNoidGameGenre[]>([]);
  const [sortBy, setSortBy] = useState<GameComparisonType>(
    GameComparisonType.RatingLow,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredGames = games.filter(
    (x) =>
      (genresSelected.includes(x.genre) || genresSelected.length == 0) &&
      favorites.userFavoriteGames &&
      favorites.userFavoriteGames.some((y) => y.gameId == x.id && y.status),
  );

  const renderGames = filteredGames.slice(
    (currentPage - 1) * PAGINATION_LIMIT,
    currentPage * PAGINATION_LIMIT,
  );
  return (
    <div id={"favorites"} className={"flex w-full flex-col"}>
      <span className={"font-museo text-[1.667vw] font-bold text-foreground"}>
        Favorite games
      </span>
      <span
        className={
          "mt-[0.781vw] w-1/2 font-plexsans text-[0.833vw] text-foreground"
        }
      >
        If you have any questions or notice any issues with the operation of our
        application, please do not hesitate to contact us. We will be more than
        happy to answer any questions you may have and try our best to solve any
        problems as soon as possible.
      </span>
      <div className={"flex w-full flex-row items-center justify-between"}>
        <div className={"mt-[0.781vw] flex flex-row gap-[0.781vw]"}>
          {ALL_GAME_TAGS.map((tag, index) => (
            <button
              key={index}
              className={cn(
                "cursor-pointer rounded-[0.26vw] border border-foreground px-[0.521vw] py-[0.26vw] text-center font-plexsans text-[0.833vw] text-foreground",
                genresSelected == tag.genres
                  ? "border-left-accent bg-left-accent text-bg-dark"
                  : "hover:border-left-accent hover:text-left-accent",
              )}
              onClick={() => {
                genresSelected == tag.genres
                  ? setGenresSelected([])
                  : setGenresSelected(tag.genres);
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <SortByFilter
          sortMethods={GAME_STORE_SORT_METHODS}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <div className={"mt-[0.781vw] grid w-full grid-cols-4 gap-[0.781vw]"}>
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
        {renderGames.length == 0 && (
          <div className="h-[352px] w-fit">
            <Lottie
              options={{
                animationData: SnakeNoEvents,
                rendererSettings: {
                  className: "z-0 h-full",
                },
              }}
            ></Lottie>
          </div>
        )}
      </div>
    </div>
  );
}
