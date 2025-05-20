'use client';

import Image from 'next/image';
import Link from 'next/link';
import frogWarriorIMG from '@/public/image/nft/frog-warrior.svg';
import dragonKingIMG from '@/public/image/nft/dragon-king.svg';
import frogWarriorHatIMG from '@/public/image/nft/frog-warrior-hat.svg';
import frogWizardIMG from '@/public/image/nft/frog-wizard.svg';
import { useEffect, useState } from 'react';
import { cn } from '@zknoid/sdk/lib/helpers';

function Trait({
  title,
  description,
  rarity,
  quanity,
  className,
}: {
  title: string;
  description: string;
  rarity: number;
  quanity: number;
  className?: string;
}) {
  return (
    <div
      className={cn('flex flex-col gap-[1.176vw] lg:!gap-[0.521vw] lg:!my-[0.521vw]', className)}
    >
      <span
        className={
          'font-plexsans font-medium leading-[110%] text-foreground text-[4.706vw] lg:!text-[1.042vw]'
        }
      >
        {title}
      </span>
      <span
        className={'font-plexsans leading-[110%] text-foreground text-[3.765vw] lg:!text-[0.833vw]'}
      >
        {description}
      </span>
      <div className={'flex flex-row gap-[2.353vw] lg:!gap-[0.521vw] items-center'}>
        <span
          className={
            'py-[1.176vw] lg:!py-[0.26vw] px-[2.353vw] lg:!px-[0.521vw] rounded-[1.176vw] lg:!rounded-[0.26vw] bg-[#121212] text-[3.765vw] lg:!text-[0.833vw]'
          }
        >
          Rarity: {rarity}%
        </span>
        <span
          className={
            'py-[1.176vw] lg:!py-[0.26vw] px-[2.353vw] lg:!px-[0.521vw] rounded-[1.176vw] lg:!rounded-[0.26vw] bg-[#121212] text-[3.765vw] lg:!text-[0.833vw]'
          }
        >
          Quantity: {quanity}
        </span>
      </div>
    </div>
  );
}

export default function InfoPage() {
  const nftLength = 112;
  const nftTotalPrice = 11340;
  const nftMintedAmount = 54;

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
            {/* <div
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
      <section
        className={
          'mx-[4.706vw] lg:!mx-auto lg:!w-[62.5vw] mt-[8.235vw] lg:!mt-[2.604vw] mb-[23.529vw] lg:!mb-[7.813vw] flex flex-col gap-[7.059vw] lg:!gap-[0.781vw]'
        }
      >
        <div className={'flex flex-col lg:!flex-row gap-[7.059vw] lg:!gap-[0.781vw]'}>
          <div
            className={
              'w-full bg-[#252525] rounded-[1.176vw] lg:!rounded-[0.26vw] flex flex-col p-[3.529vw] lg:!p-[0.781vw]'
            }
          >
            <span
              className={'text-[5.647vw] lg:!text-[1.667vw] font-medium font-museo text-foreground'}
            >
              Suitability Rating
            </span>
            <Trait
              title="Gold"
              description="The most valuable NFTs are gold, they differ in that the reptiles in them have the
                rarest characteristics of appearance and expertise"
              rarity={10}
              quanity={10}
              className="mt-[4.706vw]"
            />
            <Trait
              title="Silver"
              description="The silver NFT consist of reptiles who have one rarest characteristics or expertise."
              rarity={10}
              quanity={10}
              className="mt-[4.706vw]"
            />
            <Trait
              title="Bronze"
              description="The bronze NFT consist of the less rarest characteristics but as cute as another
                classes above."
              rarity={10}
              quanity={10}
              className="mt-[4.706vw]"
            />
          </div>
          <div
            className={
              'w-full bg-[#252525] rounded-[1.176vw] lg:!rounded-[0.26vw] flex flex-col p-[3.529vw] lg:!p-[0.781vw]'
            }
          >
            <span
              className={'text-[5.647vw] lg:!text-[1.667vw] font-medium font-museo text-foreground'}
            >
              Race
            </span>
            <Trait
              title="Dragon"
              description="The dragon is a mythical creature endowed with great power and magical properties.
                Dragons are always protecting something important and valuable."
              rarity={10}
              quanity={10}
              className="mt-[4.706vw]"
            />
            <Trait
              title="Frog"
              description="The frog is a freshwater reptile devoid of a tail, but capable of jumping incredible
                distances."
              rarity={10}
              quanity={10}
              className="mt-[4.706vw]"
            />
            <Trait
              title="Lizard"
              description="The lizard is a fast and agile reptile endowed with the ability to regrow new body
                parts for itself."
              rarity={10}
              quanity={10}
              className="mt-[4.706vw]"
            />
          </div>
        </div>
        <div
          className={
            'w-full bg-[#252525] rounded-[1.176vw] lg:!rounded-[0.26vw] flex flex-col p-[3.529vw] lg:!p-[0.781vw]'
          }
        >
          <span
            className={'text-[5.647vw] lg:!text-[1.667vw] font-medium font-museo text-foreground'}
          >
            Skin
          </span>
          <span
            className={
              'font-plexsans mt-[4.706vw] lg:!my-[0.521vw] leading-[110%] text-foreground text-[3.765vw] lg:!text-[0.833vw] lg:!max-w-[50%]'
            }
          >
            Skin of the ZkNoid reptiles have a different colors, some colors you may meet more often
            and some less. The rarity of the creature depends on it.
          </span>
          <div className="lg:!hidden flex flex-col gap-[2.353vw] mt-[3.529vw]">
            <div className="flex flex-row w-full items-center justify-between border-b border-foreground pb-[2.353vw]">
              <span className="text-[3.765vw] font-plexsans leading-[110%] font-semibold">Red</span>
              <span className={'text-[3.765vw] font-plexsans leading-[110%]'}>34%</span>
            </div>
            <div className="flex flex-row w-full items-center justify-between border-b border-foreground pb-[2.353vw]">
              <span className="text-[3.765vw] font-plexsans leading-[110%] font-semiboldx">
                Purple
              </span>
              <span className={'text-[3.765vw] font-plexsans leading-[110%]'}>34%</span>
            </div>
            <div className="flex flex-row w-full items-center justify-between border-b border-foreground pb-[2.353vw]">
              <span className="text-[3.765vw] font-plexsans leading-[110%] font-semibold">
                Yellow
              </span>
              <span className={'text-[3.765vw] font-plexsans leading-[110%]'}>46%</span>
            </div>
            <div className="flex flex-row w-full items-center justify-between pb-[2.353vw]">
              <span className="text-[3.765vw] font-plexsans leading-[110%] font-semibold">
                Black
              </span>
              <span className={'text-[3.765vw] font-plexsans leading-[110%]'}>12%</span>
            </div>
          </div>
          <div className={'hidden lg:!flex flex-row gap-[0.781vw] items-center'}>
            <div className={'flex flex-col gap-[0.26vw] items-center'}>
              <div className={'w-[3.125vw] h-[3.125vw] mb-[0.26vw] bg-[#FF5B23] rounded-full'} />
              <span className={'text-[0.833vw] font-plexsans leading-[110%] font-semibold'}>
                Red
              </span>
              <span className={'text-[0.833vw] font-plexsans leading-[110%]'}>34%</span>
            </div>
            <div className={'flex flex-col gap-[0.26vw] items-center'}>
              <div className={'w-[3.125vw] h-[3.125vw] mb-[0.26vw] bg-[#D6C1FF] rounded-full'} />
              <span className={'text-[0.833vw] font-plexsans leading-[110%] font-semibold'}>
                Purple
              </span>
              <span className={'text-[0.833vw] font-plexsans leading-[110%]'}>15%</span>
            </div>
            <div className={'flex flex-col gap-[0.26vw] items-center'}>
              <div className={'w-[3.125vw] h-[3.125vw] mb-[0.26vw] bg-[#D2FF00] rounded-full'} />
              <span className={'text-[0.833vw] font-plexsans leading-[110%] font-semibold'}>
                Yellow
              </span>
              <span className={'text-[0.833vw] font-plexsans leading-[110%]'}>46%</span>
            </div>
            <div className={'flex flex-col gap-[0.26vw] items-center'}>
              <div className={'w-[3.125vw] h-[3.125vw] mb-[0.26vw] bg-[#121212] rounded-full'} />
              <span className={'text-[0.833vw] font-plexsans leading-[110%] font-semibold'}>
                Black
              </span>
              <span className={'text-[0.833vw] font-plexsans leading-[110%]'}>12%</span>
            </div>
          </div>
        </div>
        <div
          className={
            'w-full bg-[#252525] rounded-[1.176vw] lg:!rounded-[0.26vw] flex flex-col p-[3.529vw] lg:!p-[0.781vw]'
          }
        >
          <span
            className={
              'text-[5.647vw] lg:!text-[1.667vw] font-medium font-museo text-foreground mb-[0.781vw]'
            }
          >
            Expertise
          </span>
          <div className={'flex flex-col lg:!grid grid-cols-2 gap-[4.706vw] lg:!gap-[1.042vw]'}>
            <div
              className={
                'flex flex-row gap-[2.353vw] lg:!gap-[0.781vw] items-center lg:!items-start'
              }
            >
              <div className={'h-full w-fit flex flex-col justify-start items-start'}>
                <div
                  className={
                    'w-[20.706vw] lg:!w-[4.583vw] h-[20.706vw] lg:!h-[4.583vw] rounded-full overflow-hidden flex justify-center items-center bg-[#121212]'
                  }
                >
                  <Image
                    src={frogWarriorIMG}
                    alt={'Frog warrior'}
                    className={'object-bottom object-contain w-full h-full'}
                  />
                </div>
              </div>
              <Trait
                title="Warrior"
                description="A strong and loyal character, a true defender and warrior who keeps calm in the
                  world of reptiles."
                rarity={10}
                quanity={10}
                className="mt-[4.706vw]"
              />
            </div>
            <div
              className={
                'flex flex-row gap-[2.353vw] lg:!gap-[0.781vw] items-center lg:!items-start'
              }
            >
              <div className={'h-full w-fit flex flex-col justify-start items-start'}>
                <div
                  className={
                    'w-[20.706vw] lg:!w-[4.583vw] h-[20.706vw] lg:!h-[4.583vw] rounded-full overflow-hidden flex justify-center items-center bg-[#121212]'
                  }
                >
                  <Image
                    src={dragonKingIMG}
                    alt={'Dragon King'}
                    className={'object-bottom object-contain w-full h-full'}
                  />
                </div>
              </div>
              <Trait
                title="King"
                description="The true master of all reptiles!"
                rarity={10}
                quanity={10}
                className="mt-[4.706vw]"
              />
            </div>
            <div
              className={
                'flex flex-row gap-[2.353vw] lg:!gap-[0.781vw] items-center lg:!items-start'
              }
            >
              <div className={'h-full w-fit flex flex-col justify-start items-start'}>
                <div
                  className={
                    'w-[20.706vw] lg:!w-[4.583vw] h-[20.706vw] lg:!h-[4.583vw] rounded-full overflow-hidden flex justify-center items-center bg-[#121212]'
                  }
                >
                  <Image
                    src={frogWizardIMG}
                    alt={'Frog wizard'}
                    className={'object-bottom object-contain w-full h-full'}
                  />
                </div>
              </div>
              <Trait
                title="Wizard"
                description="A magical creature that provides comfort to the world of reptiles and takes care
                  of the inhabitants, making their lives better with the help of magic."
                rarity={10}
                quanity={10}
                className="mt-[4.706vw]"
              />
            </div>
            <div
              className={
                'flex flex-row gap-[2.353vw] lg:!gap-[0.781vw] items-center lg:!items-start'
              }
            >
              <div className={'h-full w-fit flex flex-col justify-start items-start'}>
                <div
                  className={
                    'w-[20.706vw] lg:!w-[4.583vw] h-[20.706vw] lg:!h-[4.583vw] rounded-full overflow-hidden flex justify-center items-center bg-[#121212]'
                  }
                >
                  <Image
                    src={frogWarriorHatIMG}
                    alt={'Frog warrior hat'}
                    className={'object-bottom object-contain w-full h-full'}
                  />
                </div>
              </div>
              <Trait
                title="Villagers"
                description="An ordinary inhabitant of the reptilian world, among them there are peasants,
                  artisans and other lovers of a quiet life."
                rarity={10}
                quanity={10}
                className="mt-[4.706vw]"
              />
            </div>
          </div>
        </div>
        <div
          className={
            'w-full bg-[#252525] rounded-[1.176vw] lg:!rounded-[0.26vw] flex flex-col p-[3.529vw] lg:!p-[0.781vw]'
          }
        >
          <span
            className={'text-[5.647vw] lg:!text-[1.667vw] font-medium font-museo text-foreground'}
          >
            Edition
          </span>
          <div className={'flex flex-col gap-[2.353vw] lg:!gap-[0.521vw] lg:!my-[0.521vw]'}>
            <span
              className={
                'font-plexsans leading-[110%] text-foreground text-[3.765vw] lg:!text-[0.833vw] lg:!max-w-[50%]'
              }
            >
              The first ZkNoid NFT Avatars collection consist of 100 items
            </span>
            <div className={'flex flex-row gap-[2.353vw] lg:!gap-[0.521vw] items-center'}>
              <span
                className={
                  'text-[3.765vw] lg:!text-[0.833vw] py-[1.176vw] lg:!py-[0.26vw] px-[2.353vw] lg:!px-[0.521vw] rounded-[1.176vw] lg:!rounded-[0.26vw] bg-[#121212]'
                }
              >
                Quantity: 100
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
