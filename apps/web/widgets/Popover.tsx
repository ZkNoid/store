'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@zknoid/sdk/lib/helpers';

type PopoverPosition = 'left' | 'right' | 'top';

interface InfoPopoverProps {
  title: string;
  content: string;
  children?: ReactNode;
  className?: string;
  popoverClassName?: string;
  offsetTop?: number;
  offsetSide?: number;
  position?: PopoverPosition;
  icon?: ReactNode;
  hideOnHover?: boolean;
}

export const InfoPopoverIcon = ({
  empty,
  className,
}: {
  empty?: boolean;
  className?: string;
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'text-secondary h-5 w-5 cursor-pointer transition delay-100 duration-300 ease-in-out hover:text-[#F2F2F2] sm:h-4 sm:w-4',
        empty && 'hover:text-secondary cursor-default',
        className
      )}
    >
      <circle cx="8" cy="8" r="6.66667" stroke="currentColor" />
      <path d="M8 7.33333V10.6667" stroke="currentColor" />
      <circle cx="8" cy="5.33333" r="0.666667" fill="currentColor" />
    </svg>
  );
};

export const InfoPopover = ({
  icon,
  title,
  content,
  children,
  className,
  popoverClassName,
  offsetTop = 4,
  offsetSide = -8,
  position = 'right',
  hideOnHover = false,
}: InfoPopoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're in a browser environment and determine screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    if (infoRef.current && !isMobile) {
      const rect = infoRef.current.getBoundingClientRect();

      setPopoverPosition({
        top: position === 'top' ? rect.top : rect.bottom,
        left: position === 'left' ? rect.left : rect.right,
      });
    }
  }, [isHovered, position, isMobile]);

  // Desktop and mobile variants for the popover
  const desktopVariants = {
    hidden: { opacity: 0, y: position === 'top' ? 5 : -5 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={infoRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={() => {
        if (!hideOnHover) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onMouseEnter={() => {
          if (hideOnHover) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (hideOnHover) {
            setIsHovered(false);
          }
        }}
      >
        {icon || <InfoPopoverIcon empty={!title && !content} />}
      </div>
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isHovered && isMobile && (
              // Mobile popover that slides from bottom
              <motion.div
                className="fixed inset-x-0 bottom-0 z-[100000000000000] flex w-full flex-col bg-[#252525] p-5"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileVariants}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <button
                  className="cursor-pointer self-end pb-5"
                  onClick={() => setIsHovered(false)}
                >
                  <Image
                    src={'/images/icons/mobile-close-cross.svg'}
                    alt="close"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </button>
                <div className="text-foreground pb-3 text-center text-xl">
                  {title}
                </div>
                <div className="text-secondary text-center text-sm whitespace-pre-line">
                  {content}
                </div>
                {children}
              </motion.div>
            )}

            {isHovered && !isMobile && (
              // Desktop popover with original positioning
              <motion.div
                className={cn(
                  'flex w-112 flex-col bg-[#252525] border border-[#F9F8F4] p-6 rounded-[5px]',
                  popoverClassName
                )}
                style={{
                  position: 'fixed',
                  zIndex: 100000,
                  ...(position === 'top'
                    ? {
                        bottom: `calc(100vh - ${popoverPosition.top}px + ${offsetTop || 0} * var(--spacing))`,
                        left: `calc(${popoverPosition.left}px - 56 * var(--spacing) + ${offsetSide || 0} * var(--spacing))`, // Center the popover with offsetSide adjustment
                      }
                    : {
                        top: `calc(${popoverPosition.top}px + ${offsetTop || 0} * var(--spacing))`,
                        ...(position === 'left'
                          ? {
                              left: `calc(${popoverPosition.left}px - ${offsetSide || 0} * var(--spacing))`,
                            }
                          : {
                              right: `calc(100vw - ${popoverPosition.left}px + ${offsetSide || 0} * var(--spacing))`,
                            }),
                      }),
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={desktopVariants}
                transition={{ duration: 0.2 }}
              >
                {title && content && (
                  <>
                    <div className="text-foreground pb-3 text-sm">{title}</div>
                    <div className="text-secondary text-xs leading-5 whitespace-pre-line">
                      {content}
                    </div>
                  </>
                )}
                {children}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
