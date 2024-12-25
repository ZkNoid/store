"use client";

import "reflect-metadata";
import Footer from "@zknoid/sdk/components/widgets/Footer/Footer";
import Header from "@zknoid/sdk/components/widgets/Header";
import ZkNoidGameContext from "@zknoid/sdk/lib/contexts/ZkNoidGameContext";
import SetupStoreContext from "../../../packages/sdk/lib/contexts/SetupStoreContext";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { api } from "../trpc/react";
import Swiper from "../sections/Swiper";
import { Suspense } from "react";
import CentralBlock from "../widgets/CentralBlock";
import Storefront from "../sections/Storefront";

export default function Home() {
  const networkStore = useNetworkStore();
  const accountData = api.http.accounts.getAccount.useQuery({
    userAddress: networkStore.address || "",
  }).data;
  const nameMutator = api.http.accounts.setName.useMutation();
  const avatarIdMutator = api.http.accounts.setAvatar.useMutation();
  const gameFeedbackMutator = api.http.ratings.setGameFeedback.useMutation();
  const getGameIdQuery = api.http.ratings.getGameRating;
  const setFavoriteGameStatusMutation =
    api.http.favorites.setFavoriteGameStatus.useMutation();
  const getFavoriteGamesQuery = api.http.favorites.getFavoriteGames.useQuery({
    userAddress: networkStore.address || "",
  });
  return (
    <ZkNoidGameContext.Provider
      value={{
        client: undefined,
        appchainSupported: false,
        buildLocalClient: true,
      }}
    >
      <SetupStoreContext.Provider
        value={{
          account: {
            name: accountData?.account?.name,
            avatarId: accountData?.account?.avatarId,
            nameMutator: (name) =>
              nameMutator.mutate({
                userAddress: networkStore.address || "",
                name: name,
              }),
            avatarIdMutator: (avatarId) =>
              avatarIdMutator.mutate({
                userAddress: networkStore.address || "",
                avatarId: avatarId,
              }),
          },
          ratings: {
            gameFeedbackMutator: (feedback) =>
              gameFeedbackMutator.mutate({
                userAddress: feedback.userAddress,
                gameId: feedback.gameId,
                feedback: feedback.feedbackText,
                rating: feedback.rating,
              }),
            getGameRatingQuery: (gameId) =>
              (getGameIdQuery.useQuery({ gameId: gameId })?.data
                ?.rating as Record<number, number>) || undefined,
          },
          favorites: {
            setFavoriteGameStatus: (userAddress, gameId, status) =>
              setFavoriteGameStatusMutation.mutate({
                userAddress: userAddress,
                gameId: gameId,
                status: status,
              }),
            userFavoriteGames: getFavoriteGamesQuery.data?.favorites as [],
          },
        }}
      >
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className={"px-[2.604vw]"}>
            <Swiper />

            <Suspense fallback={<p>Loading...</p>}>
              <CentralBlock />
              <Storefront />
            </Suspense>
          </main>

          <Footer />
        </div>
      </SetupStoreContext.Provider>
    </ZkNoidGameContext.Provider>
  );
}
