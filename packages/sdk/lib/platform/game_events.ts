import { DateTime, DurationObjectUnits, Interval } from "luxon";
import { useEffect, useState } from "react";

export enum ZkNoidEventType {
  PAST_EVENTS = "Past events",
  CURRENT_EVENTS = "Current events",
  UPCOMING_EVENTS = "Upcoming events",
  PREREGISTRAION = "Preregistration of the event",
}

export const ALL_GAME_EVENT_TYPES = [
  ZkNoidEventType.PAST_EVENTS,
  ZkNoidEventType.CURRENT_EVENTS,
  ZkNoidEventType.UPCOMING_EVENTS,
  ZkNoidEventType.PREREGISTRAION,
];

export type ZkNoidEvent = {
  name: string;
  description: string;
  eventStarts: number;
  eventEnds: number;
  link: string;
  image?: string;
  imageFullWidth?: boolean;
  textColor?: "white" | "black";
};

export const GAME_EVENTS: ZkNoidEvent[] = [
  {
    name: "TileVille Challenge",
    description:
      "Three-day city-builder challenge in strategic city-builder in game TileVille",
    eventStarts: new Date("2024-06-21").getTime(),
    eventEnds: new Date("2024-06-24").getTime(),
    link: "https://www.tileville.xyz/",
    image: "/image/events/banner/tileville_banner.svg",
  },
  {
    name: "Checkers game test",
    description: "Play chess, find bugs, report bugs and grab reward!",
    eventStarts: new Date("2024-06-30").getTime(),
    eventEnds: new Date("2024-09-10").getTime(),
    link: "/games/arkanoid/0",
    image: "/image/events/banner/checkers_banner.svg",
  },
  {
    name: "ETHGlobal Online Hack",
    description:
      "Discover the world of provable, zero-knowledge game development on Mina Protocol! Create your own fair game environment based on the modular “plug and play” SDK From ZkNoid.",
    eventStarts: new Date("2024-08-23").getTime(),
    eventEnds: new Date("2024-09-13").getTime(),
    link: "https://ethglobal.com/events/ethonline2024",
    image: "/image/events/eth-online.svg",
    imageFullWidth: true,
    textColor: "black",
  },
  {
    name: "ETHGlobal Singapore Hack",
    description:
      "Discover the world of provable, zero-knowledge game development on Mina Protocol! Create your own fair game environment based on the modular “plug and play” SDK From ZkNoid.",
    eventStarts: new Date("2024-09-20").getTime(),
    eventEnds: new Date("2024-09-22").getTime(),
    link: "https://ethglobal.com/events/singapore2024",
    image: "/image/events/eth-singapore.svg",
    imageFullWidth: true,
    textColor: "black",
  },
  {
    name: "ZkNoid Bounty for Gamers",
    description:
      "To participate in the bounty, simply record your ZkNoid gaming journey with any screen recording software and send it to us. Be creative, using editing software is encouraged! Don’t forget to describe your experience in a comment to the submission.",
    eventStarts: new Date("2024-09-13").getTime(),
    eventEnds: new Date("2024-10-04").getTime(),
    link: "https://github.com/ZkNoid/zknoid/issues/13",
    image: "/image/events/astromina.svg",
    imageFullWidth: true,
    textColor: "white",
  },
  {
    name: "Lottery L1 Testnet",
    description:
      "The long-awaited event: The lottery game testnet is coming. The testnet allows users to test game features, check tasks, do it, help the team fix bugs and get rewards.",
    eventStarts: new Date("2024-10-14").getTime(),
    eventEnds: new Date("2024-10-29").getTime(),
    link: "https://quest.zknoid.io",
    image: "/image/events/lottery-testnet.svg",
    imageFullWidth: true,
    textColor: "white",
  },
];

export const getEventType = (event: ZkNoidEvent): ZkNoidEventType => {
  const now = Date.now();

  if (event.eventStarts > now) return ZkNoidEventType.UPCOMING_EVENTS;

  if (event.eventEnds > now) return ZkNoidEventType.CURRENT_EVENTS;

  return ZkNoidEventType.PAST_EVENTS;
};

const getEventTime = (event: ZkNoidEvent) => {
  const now = DateTime.now();
  let comparedTime;

  if (event.eventStarts > now.toMillis()) {
    comparedTime = event.eventStarts;
  } else if (event.eventEnds > now.toMillis()) {
    comparedTime = event.eventEnds;
  } else {
    comparedTime = event.eventEnds;
  }

  return Interval.fromDateTimes(now, DateTime.fromMillis(comparedTime))
    .toDuration(["days", "hours", "minutes", "seconds"])
    .toObject();
};

export const useEventTimer = (event: ZkNoidEvent) => {
  const [type, setType] = useState<ZkNoidEventType>();
  const [startsIn, setStartsIn] = useState<DurationObjectUnits>();

  useEffect(() => {
    const newType = getEventType(event);
    const newTime = getEventTime(event);

    setType(newType);
    setStartsIn(newTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newType = getEventType(event);
      const newTime = getEventTime(event);

      setType(newType);
      setStartsIn(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [event]);

  return { type, startsIn };
};
