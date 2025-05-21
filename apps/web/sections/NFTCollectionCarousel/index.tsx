import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { CollectionSlide } from './CollectionSlide';
import { ArrowLeftIcon } from './assets/arrow-left-icon';
import { cn } from '@zknoid/sdk/lib/helpers';

const NavButton = ({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) => {
  return (
    <button
      className="h-full w-[1.823vw] bg-[#212121] rounded-[0.521vw] px-[0.417vw] flex items-center justify-center"
      onClick={onClick}
    >
      <ArrowLeftIcon
        className={cn('w-[0.938vw] h-[1.771vw]', direction === 'right' ? 'rotate-180' : '')}
      />
    </button>
  );
};

export default function NFTCollectionCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 8000 })]
  );
  return (
    <div className="flex items-center gap-[0.26vw] w-full h-[117.647vw] lg:!h-[20.833vw] px-[3.125vw]">
      {/* Navigation left */}
      <NavButton direction="left" onClick={() => emblaApi?.scrollPrev()} />
      {/* Carousel */}
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full w-full gap-[0.26vw]">
          {[...Array(10)].map((_, index) => (
            <CollectionSlide key={index} />
          ))}
        </div>
      </div>
      {/* Navigation right */}
      <NavButton direction="right" onClick={() => emblaApi?.scrollNext()} />
    </div>
  );
}
