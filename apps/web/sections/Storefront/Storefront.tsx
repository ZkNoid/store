'use client';

import { useEffect, useState } from 'react';
import { GameComparisonType } from '@zknoid/sdk/lib/comparators/gameComparator';
import { ZkNoidGameFeature, ZkNoidGameGenre } from '@zknoid/sdk/lib/platform/game_tags';
import { ZkNoidEventType } from '@zknoid/sdk/lib/platform/game_events';
import Events from '../../widgets/Events';
import GenresFilter from '../../entities/GenresFilter';
import GameStore from '../GameStore';
import WidgetsSwitch from '../../widgets/WidgetsSwitch';
import { useSearchParams } from 'next/navigation';
import Faq from '../Faq';
import Favorites from '../Favorites';
import { announcedGames, defaultGames, IGame } from '@/app/constants/games';
import MemecoinsBanner from '../MemecoinsBanner';

export default function Storefront() {
  const searchParams = useSearchParams();
  const widget = searchParams.get('widget');

  const [games, setGames] = useState<IGame[]>(defaultGames.concat(announcedGames));
  const [sortBy, setSortBy] = useState<GameComparisonType>(GameComparisonType.RatingLow);
  const [genresSelected, setGenresSelected] = useState<ZkNoidGameGenre[]>([]);
  const [eventTypesSelected, setEventTypesSelected] = useState<ZkNoidEventType[]>([]);
  const [featuresSelected, setFeaturesSelected] = useState<ZkNoidGameFeature[]>([]);
  useEffect(() => {
    const zkNoidConfig = import('@zknoid/games/config');

    zkNoidConfig.then((zkNoidGames) => {
      setGames(
        (
          zkNoidGames.zkNoidConfig.games.map((x) => ({
            id: x.id,
            logo: x.image,
            name: x.name,
            description: x.description,
            genre: x.genre,
            features: x.features,
            tags: [],
            defaultPage: x.pageCompetitionsList
              ? 'competitions-list'
              : x.lobby
                ? 'lobby/undefined'
                : 'global',
            active: true,
            isReleased: x.isReleased,
            releaseDate: x.releaseDate,
            popularity: x.popularity,
            author: x.author,
            rules: x.rules,
            rating: 0,
            externalUrl: x.externalUrl,
          })) as IGame[]
        ).concat(announcedGames)
      );
    });
  }, []);
  return (
    <div
      className={
        'relative mt-[3.646vw] h-full w-full rounded-[2.604vw] border-2 border-left-accent bg-bg-grey p-[2.083vw]'
      }
    >
      <WidgetsSwitch />
      {widget == 'favorites' ? (
        <Favorites games={games} />
      ) : widget == 'faq' ? (
        <Faq />
      ) : (
        <>
          {/* <MemecoinsBanner /> */}
          <Events
            eventTypesSelected={eventTypesSelected}
            setEventTypesSelected={setEventTypesSelected}
          />
          <GenresFilter
            genresSelected={genresSelected}
            setGenresSelected={setGenresSelected}
            setSortBy={setSortBy}
          />
          <GameStore
            games={games}
            sortBy={sortBy}
            setSortBy={setSortBy}
            genresSelected={genresSelected}
            setGenresSelected={setGenresSelected}
            featuresSelected={featuresSelected}
            setFeaturesSelected={setFeaturesSelected}
            eventTypesSelected={eventTypesSelected}
            setEventTypesSelected={setEventTypesSelected}
          />
        </>
      )}
    </div>
  );
}
