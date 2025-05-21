'use client';

import Image from 'next/image';
import { api } from '../../trpc/react';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import frogCOIN from '../../public/image/tokens/frog.svg';
import drgnCOIN from '../../public/image/tokens/drgn.svg';
import { StatsItem } from './StatsItem';
import { MemetokenStats } from './MemetokenStats';
import { AccountStats } from './lib';
import { formatUnits } from '@zknoid/sdk/lib/unit';
import NFTItem from '../../entities/NFTItem/NFTItem';

export function Stats() {
  const networkStore = useNetworkStore();
  const { data: stats } = api.http.accountStats.getStats.useQuery({
    userAddress: networkStore.address || '',
  });
  const { data: memeTokenStats } = api.http.accountStats.getMemeTokenStats.useQuery({
    userAddress: networkStore.address || '',
  });
  const { data: userNFTs } = api.http.nft.getUserNFTs.useQuery({
    address: networkStore.address || '',
    page: 0,
  });
  const lotteryStats = [
    {
      title: 'Total rewards',
      value: formatUnits(stats?.totalRewards || 0, 9, 0),
      label: '$MINA',
      emoji: '💎',
    },
    {
      title: 'Total Wins',
      value: `${stats?.totalWins || 0}`,
      label: 'Times',
      emoji: '🎉',
    },
    {
      title: 'Total Tickets',
      value: `${stats?.totalTickets || 0}`,
      label: 'Tickets',
      emoji: '🎟️',
    },
    {
      title: 'Total Rounds',
      value: `${stats?.totalRounds || 0}`,
      label: 'Rounds',
      emoji: '🗂️',
    },
    {
      title: 'Best Reward',
      value: formatUnits(stats?.bestReward || 0, 9),
      label: '$MINA',
      emoji: '🏆',
    },
    {
      title: 'Win Rate',
      value: `${(100 * (stats?.winRate || 0)).toFixed(2)}`,
      label: '%',
      emoji: '📈',
    },
  ];

  const memeTokens = [
    {
      tokenIMG: frogCOIN,
      token: '$FROG',
      amount: memeTokenStats?.frogBalance || 0,
      place: memeTokenStats?.frogPlace || 0,
      ownership: memeTokenStats?.frogOwnership || 0,
    },
    {
      tokenIMG: drgnCOIN,
      token: '$DRGN',
      amount: memeTokenStats?.dragonBalance || 0,
      place: memeTokenStats?.dragonPlace || 0,
      ownership: memeTokenStats?.dragonOwnership || 0,
    },
  ];

  return (
    <section className="mt-[1.563vw] flex flex-col gap-[3.125vw]">
      <div className={'flex flex-col gap-[0.781vw]'}>
        <span className={'text-[1.667vw] text-foreground font-museo font-medium'}>Lottery L1</span>
        <div className={'grid grid-cols-4 gap-[0.781vw]'}>
          {lotteryStats.map((stat, index) => (
            <StatsItem
              key={index}
              title={stat.title}
              value={Number(stat.value).toFixed(1)}
              label={stat.label}
              emoji={stat.emoji}
            />
          ))}
        </div>
      </div>
      <div className={'flex flex-col gap-[0.781vw]'}>
        <span className={'text-[1.667vw] text-foreground font-museo font-medium'}>Meme tokens</span>
        <div className="flex flex-row gap-[0.781vw]">
          {memeTokens.map((token, index) => (
            <MemetokenStats
              key={index}
              tokenIMG={token.tokenIMG}
              token={token.token}
              amount={token.amount}
              place={token.place}
              ownership={token.ownership}
            />
          ))}
        </div>
      </div>

      {/* <div className={'flex flex-col gap-[0.781vw]'}>
        <span className={'text-[1.667vw] text-foreground font-museo font-medium'}>Your NFT</span>
        <div className="grid grid-cols-6 gap-[0.781vw]">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-[10vw] h-[10vw] rounded-[0.26vw] overflow-hidden">
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
      </div> */}

      <div className={'flex flex-col gap-[0.781vw]'}>
        <span className={'text-[1.667vw] text-foreground font-museo font-medium'}>Your NFT</span>

        {userNFTs?.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-foreground text-[1.042vw] font-plexsans">
              You don't have any NFTs
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-[0.781vw]">
            {userNFTs?.map((nft, index) => (
              <div key={index} className="">
                <NFTItem gridMode={6} nft={nft} setChoosenID={() => null} showMintInfo={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
