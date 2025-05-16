'use client';

import NFTStorefront from '../../sections/NFTStorefront';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { NFTCollectionIDList } from '../../lib/types/nftTypes';
import Link from 'next/link';
import { api } from '../../trpc/react';

export default function Page() {
  const nftLength = 112;
  const nftTotalPrice = 11340;
  const nftMintedAmount = 54;

  const { data: collections } = api.http.nft.getCollections.useQuery();

  const [collectionID, setCollectionID] = useState<NFTCollectionIDList>(
    NFTCollectionIDList.Tileville
  );
  const [gridMode, setGridMode] = useState<1 | 4 | 6>(4);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkWidth();

    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div className={'w-full'}>
      <div className={'relative w-full h-[117.647vw] lg:!h-[20.833vw]'}>
        {isMobile ? (
          <Image
            src={
              'https://res.cloudinary.com/dw4kivbv0/image/upload/w_1024,f_auto,fl_progressive:semi,q_auto:best/v1/store/nft/ytosgno70k1c64ozoddm'
            }
            alt={'NFTStorefront'}
            width={1024}
            height={800}
            className={'absolue left-0 top-0 w-full h-full object-center object-cover'}
          />
        ) : (
          <Image
            src={
              'https://res.cloudinary.com/dw4kivbv0/image/upload/w_3000,f_auto,fl_progressive:semi,q_auto:best/v1/store/nft/xnhhauzu6mliclwhb0ja'
            }
            alt={'NFTStorefront'}
            width={2000}
            height={800}
            className={'absolue left-0 top-0 w-full h-full object-center object-cover'}
          />
        )}

        <div
          className={
            'absolute left-0 top-0 flex flex-col gap-[4.706vw] lg:!gap-0 w-full h-full px-[4.706vw] lg:!px-[2.604vw] py-[4.706vw] lg:!py-[1.563vw]'
          }
        >
          <div className={'flex items-start justify-end h-fit lg:!h-full w-full'}>
            <Link
              href={'/nft/info'}
              className={
                'flex flex-row mr-auto lg:!mr-0 items-center gap-[2.353vw] lg:!gap-[0.521vw] p-[2.353vw] lg:!p-[0.521vw] rounded-[2.353vw] lg:!rounded-[0.521vw] backdrop-blur-[20px] bg-foreground/10'
              }
            >
              <span
                className={
                  'text-[3.765vw] lg:!text-[1.667vw] font-plexsans font-bold leading-[100%] text-foreground'
                }
              >
                Traits Info
              </span>
              <svg
                width="27"
                height="28"
                viewBox="0 0 27 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={'w-[5.882vw] lg:!w-[1.406vw] h-[5.882vw] lg:!h-[1.406vw]'}
              >
                <circle cx="13.5" cy="14" r="13.5" fill="#F9F8F4" />
                <path
                  d="M14.508 19.344H12.42L12.252 7.056H14.652L14.508 19.344ZM14.676 24H12.276V21.648H14.676V24Z"
                  fill="#252525"
                />
              </svg>
            </Link>
          </div>
          <div
            className={
              'w-full lg:!h-full grid grid-cols-3 gap-[2.353vw] lg:!gap-0 lg:!flex flex-row lg:!justify-between lg:!items-end'
            }
          >
            <div className={'col-span-3 flex flex-col gap-[2.353vw] lg:!gap-[0.781vw]'}>
              <span
                className={
                  'text-foreground lg:!text-[1.667vw] font-bold font-plexsans leading-[100%]'
                }
              >
                ZkNoid Avatars Collection
              </span>
              <span
                className={
                  'text-foreground lg:!text-[0.833vw] font-plexsans leading-[110%] lg:!max-w-[20.313vw]'
                }
              >
                The ZkNoid Avatars collection is the first of its kind. The holders of Zknode NFTs
                not only have access to the image, but also the personality of a reptilian fantasy
                world. You can become the King, Warrior, Wizard, or Citizen in this world.
              </span>
            </div>
            {/*
            <div
              className={
                'col-span-3 grid grid-cols-3 lg:!flex flex-row gap-[2.353vw] lg:!gap-[3.073vw]'
              }
            >
              <div
                className={
                  'justify-between lg:!justify-normal p-[2.353vw] lg:!p-[0.521vw] backdrop-blur-[20px] bg-foreground/10 rounded-[2.353vw] lg:!rounded-[0.521vw] flex flex-col gap-[2.353vw] lg:!gap-[0.521vw]'
                }
              >
                <span
                  className={
                    'text-foreground text-[4.706vw] lg:!text-[1.667vw] font-plexsans font-bold leading-[100%]'
                  }
                >
                  {nftLength}
                </span>
                <span
                  className={
                    'text-foreground text-[3.765vw] lg:!text-[0.833vw] font-plexsans leading-[110%]'
                  }
                >
                  Total Volume
                </span>
              </div>
              <div
                className={
                  'justify-between lg:!justify-normal p-[2.353vw] lg:!p-[0.521vw] backdrop-blur-[20px] bg-foreground/10 rounded-[2.353vw] lg:!rounded-[0.521vw] flex flex-col gap-[2.353vw] lg:!gap-[0.521vw]'
                }
              >
                <span
                  className={
                    'text-foreground text-[4.706vw] lg:!text-[1.667vw] font-plexsans font-bold leading-[100%]'
                  }
                >
                  {nftTotalPrice} MINA
                </span>
                <span
                  className={
                    'text-foreground text-[3.765vw] lg:!text-[0.833vw] font-plexsans leading-[110%]'
                  }
                >
                  Total price
                </span>
              </div>
              <div
                className={
                  'p-[2.353vw] lg:!p-[0.521vw] backdrop-blur-[20px] bg-foreground/10 rounded-[2.353vw] lg:!rounded-[0.521vw] flex flex-col justify-between lg:!justify-normal gap-[2.353vw] lg:!gap-[0.521vw]'
                }
              >
                <span
                  className={
                    'text-foreground text-[4.706vw] lg:!text-[1.667vw] font-plexsans font-bold leading-[100%]'
                  }
                >
                  {nftMintedAmount}
                </span>
                <span
                  className={
                    'text-foreground text-[3.765vw] lg:!text-[0.833vw] font-plexsans leading-[110%]'
                  }
                >
                  Already Minted
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <NFTStorefront
        collectionID={collectionID}
        setCollectionID={value => setCollectionID(value)}
        gridMode={gridMode}
        setGridMode={value => setGridMode(value)}
      />
    </div>
  );
}
