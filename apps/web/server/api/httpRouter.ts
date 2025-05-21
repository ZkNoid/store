import { createCallerFactory, createTRPCRouter } from "../../server/api/trpc";
import { favoritesRouter } from "./routers/favorites";
import { ratingsRouter } from "./routers/rating";
import { loggingRouter } from "./routers/logging";
import { progressRouter } from "./routers/progress";
import { accountsRouter } from "./routers/accounts";
import { giftCodesRouter } from "./routers/gift-codes";
import { leaderboardRouter } from "./routers/leaderboard";
import { lotteryBackendRouter } from "./routers/lottery-backend";
import { claimRequestRouter } from "./routers/claim-requests";
import { memetokensRouter } from "./routers/memetokens";
import { txStoreRouter } from "./routers/txStore";
import { accountStatsRouter } from "./routers/accounts-stats";
import { nftRouter } from "./routers/NFT";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const httpRouter = createTRPCRouter({
  favorites: favoritesRouter,
  nft: nftRouter,
  ratings: ratingsRouter,
  logging: loggingRouter,
  progress: progressRouter,
  accounts: accountsRouter,
  accountStats: accountStatsRouter,
  giftCodes: giftCodesRouter,
  claimRequests: claimRequestRouter,
  leaderboard: leaderboardRouter,
  lotteryBackend: lotteryBackendRouter,
  memetokens: memetokensRouter,
  txStore: txStoreRouter,
});

// export type definition of API
export type HttpRouter = typeof httpRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createHttpCaller = createCallerFactory(httpRouter);
