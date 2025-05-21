'use client';
import 'reflect-metadata';
import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';
import '@zknoid/games/styles.css';
import { useParams } from 'next/navigation';

const NewCompetitionPage = dynamic(
  () => import('@zknoid/sdk/components/framework/dynamic/NewCompetitionPageWrapper'),
  {
    ssr: false,
  }
);

export default function Home({}: {}) {
  const { gameId } = useParams<{ gameId: string }>();
  return <NewCompetitionPage gameId={gameId} zkNoidConfig={zkNoidConfig} />;
}
