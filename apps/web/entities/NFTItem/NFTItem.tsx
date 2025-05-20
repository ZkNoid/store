import { NFT } from '../../lib/types/nftTypes';
import { cn, formatAddress } from '@zknoid/sdk/lib/helpers';
import { formatUnits } from '@zknoid/sdk/lib/unit';
import Image from 'next/image';

export default function NFTItem({
  gridMode,
  nft,
  setChoosenID,
  showMintInfo = true,
}: {
  gridMode: number;
  nft: NFT;
  setChoosenID: (id: string) => void;
  showMintInfo?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-bg-grey rounded-[2.353vw] lg:!rounded-[0.521vw] overflow-hidden',
        gridMode == 1
          ? 'w-full lg:!h-[2.865vw] grid grid-cols-10 pl-[0.26vw] py-[0.26vw] items-center pr-[0.625vw]'
          : gridMode == 4
            ? 'lg:!w-[15.208vw] lg:!h-[22vw] flex flex-col'
            : 'lg:!w-[9.896vw] lg:!h-[16.6vw] flex flex-col'
      )}
    >
      <button
        onClick={() => setChoosenID(nft.raw.address)}
        className={cn(
          'hover:opacity-80 overflow-hidden rounded-[1.176vw] lg:!rounded-[0.26vw]',
          gridMode == 1 ? 'lg:!w-[2.344vw] lg:!h-[2.344vw]' : 'w-full h-full'
        )}
      >
        <Image
          src={nft.image}
          alt={`${nft.collection} + ${nft.raw.address} NFT`}
          className={'w-full h-full object-cover object-center'}
          width={1000}
          height={1000}
        />
      </button>
      {gridMode == 1 ? (
        <>
          <span
            className={
              'hidden lg:!inline-block col-span-3 font-museo text-foreground font-bold leading-[100%] text-[0.833vw]'
            }
          >
            {nft.name}
          </span>

          {/* <span
            className={
              'hidden lg:!inline-block col-span-2 text-foreground text-[0.833vw] leading-[110%] font-plexsans'
            }
          >
            {formatUnits(nft.price)} MINA
          </span>
          {nft.owner ? (
            <span
              className={
                'hidden lg:!inline-block col-span-2 text-foreground text-[0.833vw] leading-[110%] font-plexsans'
              }
            >
              {formatAddress(nft.owner)}
            </span>
          ) : (
            <span
              className={
                'hidden lg:!inline-block col-span-2 text-foreground text-[0.833vw] leading-[110%] font-plexsans'
              }
            >
              Available for Mint
            </span>
          )}
          */}
          {/* 
          {nft.isMinted ? (
            <span
              className={
                'hidden lg:!inline-block col-span-2 text-end text-left-accent text-[0.833vw] leading-[110%] font-plexsans'
              }
            >
              Already Minted
            </span>
          ) : (
            <div
              className={
                'hidden col-span-2 bg-left-accent cursor-pointer hover:opacity-80 py-[0.313vw] rounded-[0.26vw] lg:!flex flex-col items-center justify-center w-full'
              }
            >
              <span className={'font-museo text-bg-grey font-medium text-[0.833vw] leading-[100%]'}>
                Buy
              </span>
            </div>
          )} */}
        </>
      ) : (
        <div
          className={'p-[2.353vw] lg:!p-[0.521vw] flex flex-col gap-[2.353vw] lg:!gap-[0.521vw]'}
        >
          <span
            className={cn(
              'font-museo text-foreground font-bold leading-[100%] text-[3.765vw]',
              gridMode == 4 ? 'lg:!text-[1.25vw]' : 'lg:!text-[0.833vw]'
            )}
          >
            {nft.name}
          </span>
          {showMintInfo && (
            <>
              {/* <span
                className={cn(
                  'text-foreground',
                  gridMode == 4
                    ? 'lg:!text-[1.042vw] text-[3.294vw] leading-[100%] font-museo font-medium'
                    : gridMode == 6
                      ? 'lg:!text-[0.729vw] leading-[100%] font-museo font-medium'
                      : 'lg:!text-[0.833vw] leading-[110%] font-plexsans'
                )}
              >
                {formatUnits(nft.price)} MINA
              </span> */}
              {nft.isMinted ? (
                <div
                  className={
                    'py-[2.353vw] lg:!py-[0.417vw] flex flex-col items-start justify-center w-full'
                  }
                >
                  <span
                    className={
                      'text-[3.294vw] lg:!text-[0.833vw] font-plexsans leading-[110%] text-left-accent'
                    }
                  >
                    Already Minted
                  </span>
                </div>
              ) : (
                <div
                  className={
                    'bg-left-accent cursor-pointer hover:opacity-80 py-[1.412vw] lg:!py-[0.417vw] rounded-[1.176vw] lg:!rounded-[0.26vw] flex flex-col items-center justify-center w-full'
                  }
                >
                  {/* <span
                    className={
                      'font-museo text-bg-grey font-medium text-[3.765vw] lg:!text-[1.042vw] leading-[100%]'
                    }
                  >
                    Buy
                  </span> */}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
