import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { NFT, NFTParam } from '../../lib/types/nftTypes';
import { formatUnits } from '@zknoid/sdk/lib/unit';
import Link from 'next/link';
import minanftLogo from '../../public/image/partners/minanft.svg';
import { formatAddress } from '@zknoid/sdk/lib/helpers';
import { InfoPopover } from '../Popover';

const explanations: Record<string, string> = {
  collection: 'This NFT is part of the collection',
  'sustainability rating': 'This trait depend of sustainability rating of the NFT',
  rating: `ZkNoid NFT’s have three levels of rarity, depending on the character's parameters: Gold, Silver, Bronze`,
  expertise: `ZkNoid NFT’s have three levels of rarity, depending on the character's parameters: Gold, Silver, Bronze`,
  eyes: `This trait depend of eye color of the reptile`,
  race: `This trait depend of race of the reptiles: Dragon, Frog, Lizard`,
  skin: `This trait depend of skin color of the reptile`,
  edition: `This NFT ia part of the First edition of ZkNoid NFTs`,
};

const DetailItem = ({ detail }: { detail: NFTParam }) => {
  if (detail.value.kind != 'string') return null; // TODO: Add text support
  return (
    <div
      className={
        'rounded-[1.176vw] lg:!rounded-[0.26vw] bg-[#252525] p-[2.353vw] lg:!p-[0.781vw] flex flex-col gap-[2.353vw] lg:!gap-[0.521vw]'
      }
    >
      <div className={'flex flex-row gap-[2.353vw] lg:!gap-[0.521vw] items-center'}>
        <span>{detail.key.charAt(0).toUpperCase() + detail.key.slice(1)}</span>
        <InfoPopover
          title={detail.key.charAt(0).toUpperCase() + detail.key.slice(1)}
          content={explanations[detail.key.toLowerCase()] || 'Nft parameter'}
          position="left"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[4.235vw] lg:!w-[0.938vw] h-[4.235vw] lg:!h-[0.938vw] cursor-pointer"
            >
              <circle cx="9" cy="9" r="9" fill="#373737" />
              <path
                d="M9.672 11.896H8.28L8.168 3.704H9.768L9.672 11.896ZM9.784 15H8.184V13.432H9.784V15Z"
                fill="#F9F8F4"
              />
            </svg>
          }
        />
      </div>
      <div className={'flex flex-row gap-[3.529vw] lg:!gap-[0.781vw] items-center'}>
        <span
          className={
            'text-[3.765vw] lg:!text-[0.938vw] text-nowrap text-foreground font-plexsans font-semibold leading-[110%]'
          }
        >
          {detail.value.data.charAt(0).toUpperCase() + detail.value.data.slice(1)}
        </span>
        {/* <span
          className={
            'text-[3.765vw] lg:!text-[0.833vw] text-foreground font-plexsans font-semibold leading-[110%]'
          }
        >
          {detail.value.data}
        </span> */}
      </div>
    </div>
  );
};

export default function NFTDetailsModal({
  nft,
  isOpen,
  onClose,
}: {
  nft: NFT | undefined;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!nft) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
          className={
            'fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center backdrop-blur-md p-[10vw] lg:!p-0'
          }
          onClick={() => onClose()}
        >
          <div
            className={
              'max-h-[90vh] lg:!max-h-max relative flex flex-col lg:!flex-row rounded-[2.353vw] lg:!rounded-[0.521vw] bg-[#373737] p-[2.353vw] lg:!p-[1.042vw] gap-[2.353vw] lg:!gap-[0.781vw]'
            }
            onClick={e => e.stopPropagation()}
          >
            <div
              className={
                'w-full h-auto lg:!h-full rounded-[2.353vw] lg:!rounded-[0.26vw] overflow-hidden'
              }
            >
              <Image
                src={nft.image}
                alt={`${nft.collection} + ${nft} NFT`}
                width={500}
                height={500}
                className={'object-center object-cover w-fit h-fit lg:!w-full lg:!h-full'}
              />
            </div>
            <div
              className={'flex flex-col gap-[2.353vw] lg:!gap-[1.042vw] w-full overflow-y-scroll'}
            >
              <div className={'flex flex-row w-full items-center justify-between'}>
                <div className={'flex flex-col gap-[1.176vw] lg:!gap-[0.26vw]'}>
                  <span
                    className={
                      'font-museo text-nowrap text-[4.2vw] lg:!text-[1.1vw] font-bold text-foreground'
                    }
                  >
                    {nft.name}
                  </span>
                  <span
                    className={
                      'text-foreground font-museo text-[3.765vw] lg:!text-[1.042vw] font-medium'
                    }
                  >
                    Price: {formatUnits(nft.price)} MINA
                  </span>
                </div>
                <div className={'flex flex-row gap-[2.353vw] lg:!gap-[0.521vw] items-center'}>
                  <Link
                    href={`https://minanft.io/@${nft.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      'flex justify-center items-center w-[8.471vw] lg:!w-[1.875vw] lg:!h-[1.875vw] h-[8.471vw] bg-[#252525] lg:!rounded-[0.26vw] rounded-[1.176vw] hover:opacity-80 cursor-pointer'
                    }
                  >
                    <Image
                      src={minanftLogo}
                      alt={'Minanft logo'}
                      className={
                        'w-[4.706vw] h-[6.118vw] lg:!w-[1.042vw] lg:!h-[1.354vw] object-contain object-center'
                      }
                    />
                  </Link>
                  <div
                    className={
                      'bg-[#252525] rounded-[1.176vw] lg:!rounded-[0.26vw] gap-[2.353vw] lg:!gap-[0.521vw] flex flex-row items-center justify-center py-[1.176vw] lg:!py-[0.521vw] px-[2.353vw] lg:!px-[2.969vw]'
                    }
                  >
                    <span
                      className={'text-[3.765vw] lg:!text-[0.833vw] font-plexsans leading-[100%]'}
                    >
                      Traits Info
                    </span>
                    <InfoPopover
                      title="Traits Info"
                      content={`NFTs have different prices and degrees of rarity, it depends on their parameters. You can view the list and the rarity of the parameters by clicking on this button.`}
                      position="left"
                      icon={
                        <svg
                          width="15"
                          height="16"
                          viewBox="0 0 15 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={'w-[5.882vw] lg:!w-full h-[5.882vw] lg:!h-[0.833vw]'}
                        >
                          <circle cx="7.5" cy="8" r="7.5" fill="#F9F8F4" />
                          <path
                            d="M8.0626 10.4133H6.9026L6.80927 3.58667H8.1426L8.0626 10.4133ZM8.15594 13H6.8226V11.6933H8.15594V13Z"
                            fill="#252525"
                          />
                        </svg>
                      }
                    ></InfoPopover>
                  </div>
                </div>
              </div>

              <div className={'grid grid-cols-2 gap-x-[3.529vw] gap-y-[2.353vw] lg:!gap-[0.781vw]'}>
                {nft.params.map((item, index) => {
                  return <DetailItem key={index} detail={item} />;
                })}
              </div>
              {!nft.isMinted ? (
                <div
                  className={
                    'mt-[4.706vw] lg:!h-[2.6vw] lg:!mt-auto bg-left-accent cursor-pointer hover:opacity-80 py-[1.882vw] lg:!py-[0.417vw] rounded-[1.176vw] lg:!rounded-[0.26vw] flex flex-col items-center justify-center w-full'
                  }
                >
                  <span
                    className={
                      'font-museo text-bg-grey font-medium text-[4.706vw] lg:!text-[1.042vw] leading-[100%]'
                    }
                  >
                    Buy
                  </span>
                </div>
              ) : (
                <div className="flex flex-row justify-between mt-auto">
                  <span className="text-[#D2FF00]">Already Minted</span>
                  <span className="text-[#D2FF00]">Owner: {formatAddress(nft.owner)}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
