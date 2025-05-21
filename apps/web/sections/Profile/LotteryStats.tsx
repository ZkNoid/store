import { useContext, useState, useEffect } from 'react';
import { useWorkerClientStore } from '../../../../packages/games/lottery/workers/workerClientStore';

import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import { useChainStore } from '@zknoid/sdk/lib/stores/minaChain';
import { cn } from '@zknoid/sdk/lib/helpers';
import LotteryContext from '../../../../packages/games/lottery/lib/contexts/LotteryContext';
import { ILotteryRound, ILotteryTicket } from '../../../../packages/games/lottery/lib/types';

import { api } from '../../trpc/react';
import Link from 'next/link';

interface TicketDataItem {
  round: number;
  winCombination: number[];
  ticketNumber: number[];
  matchedIndices: number[];
  quantity: number;
  rewards: string;
  status: { label: string; className: string } | null;
  plotteryAddress: string;
  ticketId: number;
  claimed: boolean;
  hash: string;
}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <button className="hover:opacity-80 cursor-pointer flex items-center gap-2" onClick={onChange}>
      <div
        className={cn(
          'w-[0.9375vw] h-[0.9375vw] border border-[#F9F8F4] rounded flex items-center justify-center',
          {
            'bg-[#d2ff00] border-[#d2ff00]': checked,
          }
        )}
      >
        {checked && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4L5.5 8.5L13 1" stroke="#252525" />
          </svg>
        )}
      </div>
      <span className="text-[#F9F8F4] font-plexsans">{label}</span>
    </button>
  );
}

export function LotteryStats() {
  const lotteryStore = useWorkerClientStore();
  const networkStore = useNetworkStore();
  const chainStore = useChainStore();
  const getAllUserRounds = api.http.lotteryBackend.getAllUserRounds;
  const addClaimRequestMutation = api.http.claimRequests.requestClaim.useMutation();

  // State variables
  const [onlyLosing, setOnlyLosing] = useState<boolean>(false);
  const [onlyClaimable, setOnlyClaimable] = useState<boolean>(false);
  const [currentRoundId, setCurrentRoundId] = useState<number | undefined>(undefined);
  const [roundInfos, setRoundInfos] = useState<ILotteryRound[]>([]);
  const [roundIds, setRoundsIds] = useState<{ id: number; hasClaim: boolean }[]>([]);
  const [ticketData, setTicketData] = useState<TicketDataItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roundInfosQuery = getAllUserRounds.useQuery(
    { userAddress: networkStore.address! },
    { refetchInterval: 5000 }
  );
  const roundInfosData = roundInfosQuery.data;
  // TODO: why do we need this?
  const roundIDSQuery = getAllUserRounds.useQuery(
    { userAddress: networkStore.address! },
    { refetchInterval: 5000 }
  );
  const roundIDSData = roundIDSQuery.data;

  // Process round IDs for dropdown
  useEffect(() => {
    if (!roundIDSData || !chainStore.block?.slotSinceGenesis) return;

    const roundInfos = roundIDSData as Record<number, ILotteryRound>;
    setRoundsIds(
      Object.values(roundInfos).map((item) => ({
        id: item.id,
        hasClaim: !!item.tickets.find(
          (ticket: ILotteryTicket) =>
            ticket.owner === networkStore.address && ticket.funds > BigInt(0) && !ticket.claimed
        ),
      }))
    );
  }, [roundIDSData, networkStore.address, chainStore.block?.slotSinceGenesis]);

  // Process round data and apply filters
  useEffect(() => {
    if (!roundInfosData || !chainStore.block?.slotSinceGenesis) return;

    const roundInfosArray = Object.values(roundInfosData as Record<number, ILotteryRound>)
      .filter((round) => round.winningCombination)
      .map((round) => {
        return {
          ...round,
          tickets: round.tickets.map((ticket, index) => ({
            ...ticket,
            ticketId: index,
          })),
        };
      });

    console.log('roundInfosArray', roundInfosArray);
    setRoundInfos(roundInfosArray);

    // Format data for display
    const formattedTickets = roundInfosArray.flatMap((round) => {
      // Skip rounds that don't match the filter if a specific round is selected
      if (currentRoundId !== undefined && round.id !== currentRoundId) {
        return [];
      }

      return round.tickets
        .filter((ticket: ILotteryTicket) => {
          const isOwner = ticket.owner === networkStore.address;
          const hasReward = ticket.funds > BigInt(0);

          if (!isOwner) return false;
          if (onlyLosing && hasReward) return false;
          if (onlyClaimable && (!hasReward || ticket.claimed)) return false;

          return true;
        })
        .map((ticket: ILotteryTicket & { ticketId: number }): TicketDataItem => {
          // Find matched indices by comparing ticket numbers with winning combination
          const matchedIndices = ticket.numbers
            .map((num: number, idx: number) =>
              round.winningCombination && num === round.winningCombination[idx] ? idx : -1
            )
            .filter((idx: number) => idx !== -1);

          // Determine status
          let status = null;
          if (ticket.funds > BigInt(0)) {
            if (ticket.claimed) {
              status = { label: 'Claimed', className: 'text-[#dc8bff] border-[#dc8bff]' };
            } else if (ticket.claimRequested) {
              status = { label: 'Claim requested', className: 'text-[#d2ff00] border-[#d2ff00]' };
            } else {
              status = {
                label: 'Available to claim',
                className: 'text-[#d2ff00] border-[#d2ff00]',
              };
            }
          }

          return {
            round: round.id,
            winCombination: round.winningCombination || [],
            ticketNumber: ticket.numbers,
            matchedIndices: matchedIndices,
            quantity: Number(ticket.amount),
            rewards: ticket.funds > BigInt(0) ? `${Number(ticket.funds) / 10 ** 9} MINA` : '0 MINA',
            status: status,
            plotteryAddress: round.plotteryAddress,
            ticketId: ticket.ticketId,
            claimed: ticket.claimed,
            hash: ticket.hash,
          };
        });
    });

    setTicketData(formattedTickets);
  }, [
    roundInfosData,
    currentRoundId,
    onlyLosing,
    onlyClaimable,
    networkStore.address,
    chainStore.block?.slotSinceGenesis,
  ]);

  const handleClaim = (roundId: number, ticketId: number) => {
    const claimRequest = {
      userAddress: networkStore.address!,
      roundId,
      ticketId,
    };
    console.log('claimRequest', claimRequest);
    addClaimRequestMutation.mutate(claimRequest, {
      onSuccess: () => {
        roundInfosQuery.refetch();
        roundIDSQuery.refetch();
      },
    });
  };

  return (
    <div className="w-full pt-[1.5625vw]">
      {/* Table Header & Controls */}
      <div className="flex justify-between items-center mb-[1.5625vw]">
        <Link
          href="/games/lottery/global"
          className="flex items-center gap-4 bg-[#B58BE5] text-neutral-800 rounded px-6 py-3 hover:opacity-80 cursor-pointer"
        >
          <svg
            width="35"
            height="34"
            viewBox="0 0 35 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.9096 0C23.2684 0 23.6125 0.146732 23.8662 0.407917C24.1199 0.669101 24.2625 1.02334 24.2625 1.39271V3.24967C24.2625 4.11153 23.9299 4.9381 23.3379 5.54753C22.7459 6.15696 21.943 6.49934 21.1058 6.49934H19.302C19.1824 6.49934 19.0677 6.54825 18.9831 6.63531C18.8986 6.72237 18.8511 6.84045 18.8511 6.96358V8.82053H19.6123C24.1939 8.82053 26.483 8.82053 28.2435 9.9607C28.689 10.2485 29.1021 10.5865 29.4755 10.9672C30.9546 12.4713 31.4777 14.7683 32.5185 19.3606L34.3638 27.4811C34.6532 28.7512 34.4779 30.0866 33.8715 31.2322C33.2651 32.3778 32.2701 33.2534 31.0764 33.6916C29.8828 34.1299 28.5741 34.1001 27.4004 33.6081C26.2267 33.116 25.2701 32.1962 24.7134 31.0241L24.497 30.5673C24.0214 29.5678 23.2829 28.7257 22.3655 28.1368C21.4481 27.5478 20.3886 27.2357 19.3074 27.2359H15.6908C14.6099 27.2361 13.5508 27.5484 12.6337 28.1373C11.7167 28.7262 10.9785 29.5681 10.503 30.5673L10.2866 31.0241C9.72987 32.1962 8.77333 33.116 7.59961 33.6081C6.42589 34.1001 5.11724 34.1299 3.92357 33.6916C2.7299 33.2534 1.73486 32.3778 1.12847 31.2322C0.522077 30.0866 0.346828 28.7512 0.63619 27.4811L2.47968 19.3587C3.52228 14.7684 4.04359 12.4732 5.5209 10.9672C5.89529 10.5864 6.30902 10.2489 6.75471 9.9607C8.51523 8.82053 10.8061 8.82053 15.3877 8.82053H16.1489V6.96358C16.1489 5.16976 17.5613 3.71391 19.3056 3.71391H21.1094C21.229 3.71391 21.3437 3.665 21.4283 3.57793C21.5129 3.49087 21.5604 3.37279 21.5604 3.24967V1.39271C21.5604 1.02334 21.7029 0.669101 21.9566 0.407917C22.2103 0.146732 22.5544 0 22.9132 0M24.7134 16.2483C24.7134 16.7408 24.5234 17.2132 24.1851 17.5614C23.8468 17.9097 23.388 18.1053 22.9096 18.1053C22.4312 18.1053 21.9724 17.9097 21.6341 17.5614C21.2959 17.2132 21.1058 16.7408 21.1058 16.2483C21.1058 15.7558 21.2959 15.2835 21.6341 14.9353C21.9724 14.587 22.4312 14.3914 22.9096 14.3914C23.388 14.3914 23.8468 14.587 24.1851 14.9353C24.5234 15.2835 24.7134 15.7558 24.7134 16.2483ZM11.1849 14.8556C11.5437 14.8556 11.8878 15.0024 12.1415 15.2635C12.3952 15.5247 12.5377 15.879 12.5377 16.2483V17.6411H13.8906C14.2494 17.6411 14.5935 17.7878 14.8472 18.049C15.1009 18.3102 15.2434 18.6644 15.2434 19.0338C15.2434 19.4031 15.1009 19.7574 14.8472 20.0186C14.5935 20.2798 14.2494 20.4265 13.8906 20.4265H12.5377V21.8192C12.5377 22.1886 12.3952 22.5428 12.1415 22.804C11.8878 23.0652 11.5437 23.2119 11.1849 23.2119C10.8261 23.2119 10.482 23.0652 10.2283 22.804C9.97454 22.5428 9.83201 22.1886 9.83201 21.8192V20.4265H8.47915C8.12035 20.4265 7.77625 20.2798 7.52254 20.0186C7.26883 19.7574 7.12629 19.4031 7.12629 19.0338C7.12629 18.6644 7.26883 18.3102 7.52254 18.049C7.77625 17.7878 8.12035 17.6411 8.47915 17.6411H9.83201V16.2483C9.83201 15.879 9.97454 15.5247 10.2283 15.2635C10.482 15.0024 10.8261 14.8556 11.1849 14.8556ZM26.5172 22.7477C26.9956 22.7477 27.4544 22.552 27.7927 22.2038C28.131 21.8555 28.321 21.3832 28.321 20.8907C28.321 20.3982 28.131 19.9259 27.7927 19.5777C27.4544 19.2294 26.9956 19.0338 26.5172 19.0338C26.0388 19.0338 25.58 19.2294 25.2418 19.5777C24.9035 19.9259 24.7134 20.3982 24.7134 20.8907C24.7134 21.3832 24.9035 21.8555 25.2418 22.2038C25.58 22.552 26.0388 22.7477 26.5172 22.7477Z"
              fill="#212121"
            />
          </svg>

          <Link href="/games/lottery/global" className="text-2xl font-medium">
            Play Lottery
          </Link>
        </Link>

        <div className="flex gap-[2.6042vw] items-center">
          <Checkbox
            checked={onlyLosing}
            onChange={() => setOnlyLosing(!onlyLosing)}
            label="Only losing"
          />

          <Checkbox
            checked={onlyClaimable}
            onChange={() => setOnlyClaimable(!onlyClaimable)}
            label="Only claimable"
          />

          <div className="relative">
            <div
              className="flex items-center px-4 py-3 bg-neutral-800 rounded-[0.5208vw] shadow-lg cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-[#F9F8F4] mr-2">
                {currentRoundId !== undefined ? `Lottery round ${currentRoundId}` : 'All rounds'}
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('transition-transform', {
                  'transform rotate-180': isDropdownOpen,
                })}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#F9F8F4"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-full max-h-[15.625vw] overflow-y-auto bg-neutral-800 rounded-[0.5208vw] shadow-lg z-10">
                <div
                  key="all-rounds"
                  className="flex justify-between items-center px-4 py-3 hover:bg-neutral-700 cursor-pointer"
                  onClick={() => {
                    setCurrentRoundId(undefined);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className="text-[#F9F8F4]">All rounds</span>
                </div>
                {roundIds.map((round, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-4 py-3 hover:bg-neutral-700 cursor-pointer"
                    onClick={() => {
                      setCurrentRoundId(round.id);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="text-[#F9F8F4]">Lottery round {round.id}</span>
                    {round.hasClaim && (
                      <span className="bg-[#D2FF00] text-[#212121] text-xs px-2 py-1 rounded-full">
                        Claim
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-6 text-[#F9F8F4] text-sm border-b border-[#212121] pb-2 font-plexsans">
        <div className="px-4 font-plexsans">Round</div>
        <div className="px-4 font-plexsans">Win combination</div>
        <div className="px-4 font-plexsans">Ticket Number</div>
        <div className="px-4 font-plexsans text-center">Quantity</div>
        <div className="px-4 font-plexsans">Rewards</div>
        <div className="px-4 font-plexsans text-end">Status</div>
      </div>

      {/* Grid Rows */}
      <div className="mt-2 flex flex-col gap-2">
        {ticketData.length > 0 ? (
          ticketData.map((ticket, index) => (
            <div key={index} className="bg-neutral-800 rounded-[0.5208vw] py-3 font-plexsans">
              <div className="grid grid-cols-6 items-center text-[#F9F8F4]">
                <div className="px-4">{ticket.round}</div>
                <div className="px-4 flex space-x-2">
                  {ticket.winCombination.map((num: number, idx: number) => (
                    <span key={idx}>{num}</span>
                  ))}
                </div>
                <div className="px-4">
                  <div className="flex space-x-1">
                    {ticket.ticketNumber.map((num: number, idx: number) => (
                      <div
                        key={idx}
                        className={`w-[1.3542vw] h-[1.3542vw] ${
                          ticket.matchedIndices.includes(idx)
                            ? 'border border-left-accent text-neutral-800 bg-left-accent'
                            : 'border border-[#F9F8F4] text-[#F9F8F4]'
                        } rounded flex items-center justify-center`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-4 text-center">{ticket.quantity}</div>
                <div className="px-4">{Number(ticket.rewards.split(' ')[0]).toFixed(2)} MINA</div>
                <div className="px-4 justify-self-end">
                  {ticket.status ? (
                    ticket.status.label === 'Available to claim' ? (
                      <button
                        className={`${ticket.status.className} text-xs whitespace-nowrap rounded-full py-1 px-2 h-fit cursor-pointer hover:opacity-80`}
                        onClick={() => handleClaim(ticket.round, ticket.ticketId)}
                      >
                        {ticket.status.label}
                      </button>
                    ) : (
                      <span
                        className={`${ticket.status.className} text-xs whitespace-nowrap leading-[0.625vw] border rounded-full py-1 px-2 h-fit`}
                      >
                        {ticket.status.label}
                      </span>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-[#F9F8F4] py-8">No tickets found</div>
        )}
      </div>
    </div>
  );
}
