import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import { api } from '../../trpc/react';
import { useEffect, useState } from 'react';
import { getZkAppTxByHash } from '@zknoid/sdk/lib/api/getZkAppTxByHash';
import { formatAddress } from '@zknoid/sdk/lib/helpers';

interface Tx {
  status: string;
  timestamp: number;
  txHash: string;
}

function getTimeString(timestamp: number) {
  const pad = (n: number, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
  const d = new Date(timestamp);

  return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function Transactions() {
  const networkStore = useNetworkStore();
  const transactions = api.http.txStore.getUserTransactions.useQuery({
    userAddress: networkStore.address!,
  }).data?.transactions;

  const [txs, setTxs] = useState<Tx[]>([]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (!transactions) return;

    setTxs(transactions as unknown as Tx[]);

    // const checkTransaction = async (txHash: string) => {
    //   const checkTx = async (retryCount = 0) => {
    //     const maxRetries = 5;
    //     try {
    //       const transaction = await getZkAppTxByHash(txHash);
    //       if (transaction.txStatus) {
    //         return transaction;
    //       }
    //     } catch (error) {
    //       // console.error(error);
    //     }
    //     if (retryCount < maxRetries) {
    //       await sleep(retryCount * 1000);
    //       return checkTx(retryCount + 1);
    //     }
    //     return null;
    //   };

    //   return await checkTx();
    // };

    // Update each transaction independently
    transactions.forEach(item => {
      if (item.status) {
        return;
      }

      getZkAppTxByHash(item.txHash)
        .then(transaction => {
          if (!transaction) {
            setTxs(prevTxs =>
              prevTxs.map(tx =>
                tx.txHash === item.txHash
                  ? { ...tx, status: 'Unknown', timestamp: item.createdAt }
                  : tx
              )
            );
            return;
          }

          setTxs(prevTxs =>
            prevTxs.map(tx =>
              tx.txHash === item.txHash
                ? { ...tx, status: transaction.txStatus, timestamp: transaction.timestamp }
                : tx
            )
          );
        })
        .catch(error => {
          console.error(error);
          setTxs(prevTxs =>
            prevTxs.map(tx =>
              tx.txHash === item.txHash
                ? { ...tx, status: 'Unknown', timestamp: Date.parse(item.createdAt) }
                : tx
            )
          );
        });
    });
  }, [transactions]);

  return (
    <div className="w-full pt-[1.5625vw] font-plexsans">
      <div className="grid grid-cols-3 gap-4 text-sm text-[#f9f8f4] mb-2 px-4 font-plexsans">
        <div>Transaction hash</div>
        <div className="text-center">Transaction status</div>
        <div className="text-right">Date and Time</div>
      </div>
      <div className="h-px w-full bg-[#373737] mb-3"></div>
      <div className="space-y-3">
        {txs?.map((transaction, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 px-[0.7813vw] py-[0.5208vw] bg-[#212121] rounded-xl text-sm text-[#f9f8f4]"
          >
            <div className="truncate flex items-center">
              <a
                href={`https://minascan.io/mainnet/tx/${transaction.txHash}?type=zk-tx`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {formatAddress(transaction.txHash, 10)}
              </a>
            </div>
            <div className="flex justify-center">
              {transaction.status === 'applied' && (
                <span className="bg-[#00b708] text-[#212121] px-4 py-1 rounded-[0.2604vw] text-center">
                  Success
                </span>
              )}
              {transaction.status === 'pending' && (
                <span className="bg-[#ffcc00] text-[#212121] px-4 py-1 rounded-[0.2604vw] text-center">
                  Pending
                </span>
              )}
              {transaction.status === 'failed' && (
                <span className="bg-[#dc0c07] text-white px-4 py-1 rounded-[0.2604vw] text-center">
                  Failed
                </span>
              )}
              {transaction.status === 'Unknown' && (
                <span className="bg-[#dc0c07] text-white px-4 py-1 rounded-[0.2604vw] text-center">
                  Unknown
                </span>
              )}
            </div>
            <div className="text-right flex items-center justify-end">
              {transaction.timestamp ? getTimeString(transaction.timestamp) : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
