'use client';
import 'reflect-metadata';

import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';
// import "@zknoid/games/styles.css";

const Lobby = dynamic(
  () => import('@zknoid/sdk/components/framework/dynamic/Lobby'),
  {
    ssr: false,
  }
);

export default function Home({
  params,
}: {
  params: { gameId: string; lobbyId: string };
}) {
  return (
    <Lobby
      gameId={params.gameId}
      lobbyId={params.lobbyId}
      zkNoidConfig={zkNoidConfig}
    />
  );
}
