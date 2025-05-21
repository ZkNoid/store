'use server';

import clientPromise from '@/app/lib/mongodb';
import { api } from '../../../../apps/web/trpc/react';
import { NetworkIds, NETWORKS } from '../../constants/networks';

const client = await clientPromise;
const db = client?.db(process.env.MONGODB_DB);
const network = NETWORKS[process.env.NEXT_PUBLIC_NETWORK_ID || NetworkIds.MINA_DEVNET];

export const getZkAppTxByHash = async (txHash: string) => {
  console.log(
    `curl -X GET "https://api.blockberry.one/mina-mainnet/v1/zkapps/txs/${txHash}" -H "accept: application/json" -H "x-api-key: ${process.env.BLOCKBERRY_API_KEY || ''}"`
  );
  const response = await fetch(`https://api.blockberry.one/mina-mainnet/v1/zkapps/txs/${txHash}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': process.env.BLOCKBERRY_API_KEY || '',
    },
  });
  if (!response.ok) {
    throw new Error('Error while fetching transaction');
  }

  const data = await response.json();

  if (data.txStatus === 'applied') {
    await db
      ?.collection('transactionStore')
      .updateOne({ txHash }, { $set: { status: 'applied', timestamp: data.timestamp } });
  }

  return data;
};
