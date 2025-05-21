'use client';
import 'reflect-metadata';

import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';
import { useParams } from 'next/navigation';

// import "@zknoid/games/styles.css";

const GamePageWrapper = dynamic(
  () => import('@zknoid/sdk/components/framework/dynamic/GamePageWrapper'),
  {
    ssr: false,
  }
);

export default function Home({}: {}) {
  const { competitionId, gameId } = useParams<{ competitionId: string; gameId: string }>();

  return (
    <GamePageWrapper gameId={gameId} competitionId={competitionId} zkNoidConfig={zkNoidConfig} />
  );
}
