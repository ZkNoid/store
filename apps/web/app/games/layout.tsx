'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRoundsStore } from '../../../../packages/games/lottery/lib/roundsStore';
import { api } from '../../trpc/react';
import { api as vanillaApi } from '../../trpc/vanilla';

import { ILotteryRound } from '../../../../packages/games/lottery/lib/types';
import { useNetworkStore } from '../../../../packages/sdk/lib/stores/network';
import LotteryContext from '../../../../packages/games/lottery/lib/contexts/LotteryContext';
import SetupStoreContext from '../../../../packages/sdk/lib/contexts/SetupStoreContext';
import { LOTTERY_ROUND_OFFSET } from '../../../../packages/games/lottery/ui/TicketsSection/OwnedTickets/lib/constant';

export default function Layout({ children }: { children: ReactNode }) {
  const roundsStore = useRoundsStore();
  const networkStore = useNetworkStore();

  const [roundInfo, setRoundInfo] = useState<ILotteryRound | undefined>();
  const [minaEvents, setMinaEvents] = useState<any | undefined>(undefined);
  const getRoundQuery = api.http.lotteryBackend.getRoundInfos.useQuery(
    {
      roundIds: [roundsStore.roundToShowId - LOTTERY_ROUND_OFFSET],
    },
    {
      refetchInterval: 5000,
    }
  );
  const getRoundQueryOneDay = api.http.lotteryBackend.getRoundInfos.useQuery(
    {
      roundIds: [roundsStore.roundToShowId],
      oneDay: true,
    },
    {
      refetchInterval: 5000,
    }
  );

  const getUserNFTQuery = api.http.nft.getUserNFTs.useQuery({
    address: networkStore.address!,
    page: 0,
    hitsPerPage: 100,
  });

  const getMinaEventsQuery = api.http.lotteryBackend.getMinaEvents.useQuery({});

  const addGiftCodesMutation = api.http.giftCodes.addGiftCodes.useMutation();
  const addClaimRequestMutation = api.http.claimRequests.requestClaim.useMutation();
  const sendTicketQueueMutation = api.http.giftCodes.sendTicketQueue.useMutation();
  const getRoundsInfosQuery = api.http.lotteryBackend.getRoundInfos;

  const accountDataQuery = api.http.accounts.getAccount.useQuery({
    userAddress: networkStore.address || '',
  });
  const accountData = accountDataQuery.data;
  const refetchAccountData = accountDataQuery.refetch;
  const nameMutator = api.http.accounts.setName.useMutation();
  const avatarIdMutator = api.http.accounts.setAvatar.useMutation();

  const gameFeedbackMutator = api.http.ratings.setGameFeedback.useMutation();
  const getGameIdQuery = api.http.ratings.getGameRating;

  const setFavoriteGameStatusMutation = api.http.favorites.setFavoriteGameStatus.useMutation();
  const getFavoriteGamesQuery = api.http.favorites.getFavoriteGames.useQuery({
    userAddress: networkStore.address || '',
  });

  const sendMessageMutation = api.ws.chat.sendMessage.useMutation();
  const onMessageSubscription = api.ws.chat.onMessage;

  const userTransactions = api.http.txStore.getUserTransactions.useQuery({
    userAddress: networkStore.address || '',
  });
  const addTransaction = api.http.txStore.addTransaction.useMutation();

  useEffect(() => {
    if (roundsStore.roundToShowId < LOTTERY_ROUND_OFFSET) return;
    if (!getRoundQuery.data) return undefined;

    setRoundInfo(Object.values(getRoundQuery.data)[0]);
  }, [roundsStore.roundToShowId, getRoundQuery.data]);

  useEffect(() => {
    if (roundsStore.roundToShowId >= LOTTERY_ROUND_OFFSET) return;
    if (!getRoundQueryOneDay.data) return undefined;

    setRoundInfo(Object.values(getRoundQueryOneDay.data)[0]);
  }, [roundsStore.roundToShowId, getRoundQueryOneDay.data]);

  useEffect(() => {
    if (!getMinaEventsQuery.data) return undefined;
    setMinaEvents(getMinaEventsQuery.data);
  }, [getMinaEventsQuery.data]);

  return (
    <SetupStoreContext.Provider
      value={{
        account: {
          name: accountData?.account?.name,
          avatarId: accountData?.account?.avatarId,
          avatarUrl: accountData?.account?.avatarUrl,
          nameMutator: name =>
            nameMutator.mutate({
              userAddress: networkStore.address || '',
              name: name,
            }),
          avatarIdMutator: (avatarId, avatarUrl) =>
            avatarIdMutator.mutate({
              userAddress: networkStore.address || '',
              avatarId: avatarId,
              avatarUrl: avatarUrl,
            }),
        },
        refetchAccountData: refetchAccountData,
        userNFT: getUserNFTQuery.data,
        ratings: {
          gameFeedbackMutator: feedback =>
            gameFeedbackMutator.mutate({
              userAddress: feedback.userAddress,
              gameId: feedback.gameId,
              feedback: feedback.feedbackText,
              rating: feedback.rating,
            }),
          getGameRatingQuery: gameId =>
            (getGameIdQuery.useQuery({ gameId: gameId })?.data?.rating as Record<number, number>) ||
            undefined,
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
        chat: {
          sendMessageMutator: async ({ roomId, sender, text }) =>
            await sendMessageMutation.mutateAsync({
              roomId: roomId,
              sender: sender,
              text: text,
            }),
          onMessageSubscription: ({ roomId, opts }) =>
            onMessageSubscription.useSubscription({ roomId }, opts),
        },
        txStore: {
          userTransactions: userTransactions.data?.transactions as [],
          addTransaction: (userAddress, txHash, type) =>
            addTransaction.mutate({
              userAddress: userAddress,
              txHash: txHash,
              type: type,
            }),
        },
      }}
    >
      <LotteryContext.Provider
        value={{
          roundInfo: roundInfo,
          minaEvents: minaEvents,
          getRoundsInfosQuery: (roundsIds, oneDay, params) =>
            (getRoundsInfosQuery.useQuery(
              {
                roundIds: !oneDay
                  ? roundsIds.map(roundId => roundId - LOTTERY_ROUND_OFFSET)
                  : roundsIds,
                oneDay: oneDay,
              },
              params
            )?.data as Record<number, ILotteryRound>) || undefined,
          addGiftCodesMutation: giftCodes => addGiftCodesMutation.mutate(giftCodes),
          addClaimRequestMutation: claim => addClaimRequestMutation.mutate(claim),
          sendTicketQueueMutation: ticketQueue =>
            sendTicketQueueMutation.mutate({
              userAddress: ticketQueue.userAddress,
              giftCode: ticketQueue.giftCode,
              roundId: ticketQueue.roundId,
              ticket: ticketQueue.ticket,
              signature: ticketQueue.signature,
            }),
          async checkGiftCodesQuery(codes) {
            const data = await vanillaApi.http.giftCodes.checkGiftCodes.query({
              giftCodes: codes,
            });
            return data?.giftCodes;
          },
        }}
      >
        {children}
      </LotteryContext.Provider>
    </SetupStoreContext.Provider>
  );
}
