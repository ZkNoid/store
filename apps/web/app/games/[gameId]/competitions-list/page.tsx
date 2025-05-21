'use client';
import 'reflect-metadata';

import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';
import "@zknoid/games/styles.css";
import { useParams } from 'next/navigation';
const CompetitionsListPage = dynamic(
  () =>
    import('@zknoid/sdk/components/framework/dynamic/CompetitionsPageWrapper'),
  {
    ssr: false,
  }
);

export default function Home({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = useParams<{ gameId: string }>();
  return (
    <CompetitionsListPage gameId={gameId} zkNoidConfig={zkNoidConfig} />
  );
}
