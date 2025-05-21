import clientPromise from '../../../app/lib/mongodb';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../../server/api/trpc';

const client = await clientPromise;
const db = client?.db(process.env.MONGODB_DB);

export const txStoreRouter = createTRPCRouter({
  getUserTransactions: publicProcedure
    .input(z.object({ userAddress: z.string() }))
    .query(async ({ input }) => {
      if (!db) return;

      return {
        transactions: await db
          .collection('transactionStore')
          .find({
            userAddress: input.userAddress,
          })
          .toArray(),
      };
    }),

  addTransaction: publicProcedure
    .input(
      z.object({
        userAddress: z.string(),
        txHash: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (!db) return;

      await db.collection('transactionStore').insertOne({
        userAddress: input.userAddress,
        txHash: input.txHash,
        type: input.type,
        createdAt: new Date().toISOString(),
      });
    }),
});
