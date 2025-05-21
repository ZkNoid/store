'use client';
import 'reflect-metadata';

import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';
import { useParams } from 'next/navigation';
// import "@zknoid/games/styles.css";

const Lobby = dynamic(() => import('@zknoid/sdk/components/framework/dynamic/Lobby'), {
  ssr: false,
});

export default function Home({}: {}) {
  const { gameId, lobbyId } = useParams<{ gameId: string; lobbyId: string }>();
  return <Lobby gameId={gameId} lobbyId={lobbyId} zkNoidConfig={zkNoidConfig} />;
}
