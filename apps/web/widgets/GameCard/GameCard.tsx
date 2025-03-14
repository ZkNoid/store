import { IGame } from "@/app/constants/games";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import { useContext, useEffect, useState } from "react";
import SetupStoreContext from "../../../../packages/sdk/lib/contexts/SetupStoreContext";
import heart_2 from "@/public/image/misc/heart-2.svg";
import heart_1 from "@/public/image/misc/heart-1.svg";
import heart_3 from "@/public/image/misc/heart-3.svg";
import heart_2_filled from "@/public/image/misc/heart-2-filled.svg";
import heart_1_filled from "@/public/image/misc/heart-1-filled.svg";
import heart_3_filled from "@/public/image/misc/heart-3-filled.svg";
import { cn } from "@zknoid/sdk/lib/helpers";
import Link from "next/link";
import Image from "next/image";

export default function GameCard({
  game,
  color,
}: {
  game: IGame;
  color: 1 | 2 | 3 | 4;
}) {
  const networkStore = useNetworkStore();
  const notificationStore = useNotificationStore();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { ratings, favorites } = useContext(SetupStoreContext);
  const gameRating = ratings.getGameRatingQuery?.(game.id);

  useEffect(() => {
    if (favorites.userFavoriteGames) {
      if (
        favorites.userFavoriteGames.some(
          (x: any) => x.status && x.gameId == game.id,
        )
      ) {
        setIsFavorite(true);
      }
    }
  }, [favorites.userFavoriteGames]);

  const fillColor =
    color === 1
      ? "bg-middle-accent"
      : color === 2
        ? "bg-left-accent"
        : color === 3
          ? "bg-right-accent"
          : "hidden";

  const heart = color === 1 ? heart_2 : color === 2 ? heart_1 : heart_3;
  const heartActive =
    color === 1
      ? heart_2_filled
      : color === 2
        ? heart_1_filled
        : heart_3_filled;

  const hoverColor = cn(
    "hover:outline group-hover:outline outline-[1px]",
    color === 1
      ? "hover:outline-middle-accent group-hover:outline-middle-accent"
      : color === 2
        ? "hover:outline-left-accent group-hover:outline-left-accent"
        : color === 3
          ? "hover:outline-right-accent group-hover:outline-right-accent"
          : "hover:bg-gradient-to-br from-left-accent to-right-accent group-hover:bg-gradient-to-br from-left-accent to-right-accent",
  );
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-[0.521vw] bg-[#252525] p-[0.521vw] shadow-2xl",
        hoverColor,
      )}
    >
      {game.isReleased && (
        <Link
          href={
            game.externalUrl ||
            (game.active ? `/games/${game.id}/${game.defaultPage}` : "#")
          }
          target={game.externalUrl && "_blank"}
          rel={game.externalUrl && "noopener noreferrer"}
          className={"absolute left-0 top-0 h-full w-full cursor-pointer"}
        />
      )}
      <div
        className={cn(
          "flex h-[15.625vw] w-full items-center justify-center rounded-[0.26vw] outline outline-1",
          hoverColor,
        )}
      >
        <Image
          src={game.logo}
          crossOrigin="anonymous"
          width={300}
          height={300}
          alt={game.name}
          className={"h-full w-full object-contain"}
        />
      </div>
      {game.isReleased && (
        <div
          className={
            "absolute right-[0.521vw] top-[0.521vw] flex cursor-pointer items-center justify-center p-[0.521vw]"
          }
          onClick={() => {
            if (!networkStore.address) return;
            favorites?.setFavoriteGameStatus?.(
              networkStore.address,
              game.id,
              !isFavorite,
            );

            notificationStore.create({
              type: "success",
              message: isFavorite
                ? "Removed from favorites"
                : "Added to favorites",
            });
            setIsFavorite(!isFavorite);
          }}
        >
          <Image
            src={isFavorite ? heartActive : heart}
            alt={"Favorite"}
            className={"h-[1.563vw] w-[1.563vw]"}
          />
        </div>
      )}
      <div
        className={
          "mt-[0.781vw] flex w-full flex-row items-center justify-between"
        }
      >
        <span className={"font-museo text-[1.25vw] font-bold text-foreground"}>
          {game.name}
        </span>
        {game.isReleased && (
          <div className={"flex flex-row gap-[0.26vw]"}>
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"h-[0.99vw] w-[0.99vw]"}
            >
              <path
                d="M9.5 0.585938L11.6329 7.15028H18.535L12.9511 11.2073L15.084 17.7716L9.5 13.7146L3.91604 17.7716L6.04892 11.2073L0.464963 7.15028H7.36712L9.5 0.585938Z"
                fill="#D2FF00"
                className={cn(
                  color === 1
                    ? "fill-middle-accent"
                    : color === 2
                      ? "fill-left-accent"
                      : color === 3
                        ? "fill-right-accent"
                        : "",
                )}
              />
            </svg>
            <span
              className={
                "font-museo text-[0.833vw] font-medium text-foreground"
              }
            >
              {
                //@ts-ignore
                gameRating?.toFixed(1) || 0
              }
            </span>
          </div>
        )}
      </div>
      <div
        className={
          "mt-[0.26vw] w-full text-left font-plexsans text-[0.833vw] text-foreground"
        }
      >
        {game.description}
      </div>
      {game.isReleased && (
        <div
          className={"mt-auto flex w-full flex-row gap-[0.521vw] pt-[3.385vw]"}
        >
          {[...game.features, game.genre].map((item, index) => (
            <div
              key={index}
              className={cn(
                "rounded-[0.26vw] px-[0.521vw] py-[0.26vw] text-center font-museo text-[0.729vw] font-medium text-bg-grey",
                fillColor,
              )}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
