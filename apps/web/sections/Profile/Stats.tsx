'use client';

import Image from 'next/image';
import { api } from '../../trpc/react';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import frogCOIN from '../../public/image/tokens/frog.svg';
import drgnCOIN from '../../public/image/tokens/drgn.svg';
import { StatsItem } from './StatsItem';
import { MemetokenStats } from './MemetokenStats';
import { AccountStats } from './lib';

export function Stats() {
  const networkStore = useNetworkStore();
  const { data: stats } = api.http.accountStats.getStats.useQuery({
    userAddress: networkStore.address || '',
  });

  return (
    <section className="mt-[1.563vw] flex flex-col gap-[3.125vw]">
      <div className={'flex flex-col gap-[0.781vw]'}>
        <span className={'text-[1.667vw] text-foreground font-museo font-medium'}>Lottery L1</span>
        <div className={'grid grid-cols-4 gap-[0.781vw]'}>
          <StatsItem
            title="Total rewards"
            value={stats?.[AccountStats.LotteryTotalRewards] || 0}
            label="$MINA"
            emoji="💎"
          />
          <StatsItem
            title="Total Wins"
            value={stats?.[AccountStats.LotteryTotalWins] || 0}
            label="Times"
            emoji="🎉"
          />
          <StatsItem
            title="Total Tickets"
            value={stats?.[AccountStats.LotteryTotalTickets] || 0}
            label="Tickets"
            emoji="🎟️"
          />
          <StatsItem
            title="Total Rounds"
            value={stats?.[AccountStats.LotteryTotalRounds] || 0}
            label="Rounds"
            emoji="🗂️"
          />
          <StatsItem
            title="Best Reward"
            value={stats?.[AccountStats.LotteryBestReward] || 0}
            label="$MINA"
            emoji="🏆"
          />
          <StatsItem
            title="Win Rate"
            value={stats?.[AccountStats.LotteryWinRate] || 0}
            label="%"
            emoji="📈"
          />
        </div>
      </div>
      <div className="flex flex-row gap-[0.781vw]">
        <MemetokenStats tokenIMG={frogCOIN} token="$FROG" amount={0} place={0} ownership={0} />
        <MemetokenStats tokenIMG={drgnCOIN} token="$DRGN" amount={0} place={0} ownership={0} />
      </div>
      <div className="flex flex-col gap-[0.781vw]">
        <div className="grid grid-cols-4 gap-[0.781vw]">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full h-full rounded-[0.26vw] overflow-hidden">
              <Image
                src={'/image/avatars/avatar-1.svg'}
                width={100}
                height={100}
                alt="nft"
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
