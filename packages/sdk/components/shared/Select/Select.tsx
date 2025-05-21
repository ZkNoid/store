'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '../../../lib/helpers';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTriggerPick = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'bg-bg-grey rounded-[2.353vw] p-[4.706vw] lg:!rounded-[0.521vw] lg:!p-[0.781vw] flex flex-row items-center justify-between',
      className
    )}
    {...props}
  >
    <span
      className={'font-plexsans text-[3.294vw] lg:!text-[0.833vw] text-foreground leading-[110%]'}
    >
      {children}
    </span>
    <SelectPrimitive.Icon asChild>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={'w-[5.647vw] lg:!w-[1.25vw] h-[5.647vw] lg:!h-[1.25vw]'}
      >
        <path
          d="M17 9L12 4L7 9"
          stroke="#F9F8F4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 15L12 20L7 15"
          stroke="#F9F8F4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTriggerPick.displayName = SelectPrimitive.Trigger.displayName;

const SelectTriggerChevron = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'bg-bg-grey rounded-[2.353vw] p-[4.706vw] lg:!rounded-[0.521vw] lg:!p-[0.781vw] flex flex-row items-center justify-between',
      className
    )}
    {...props}
  >
    <span
      className={'font-plexsans text-[3.294vw] lg:!text-[0.833vw] text-foreground leading-[110%]'}
    >
      {children}
    </span>
    <SelectPrimitive.Icon asChild>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={'w-[5.647vw] lg:!w-[1.25vw] h-[5.647vw] lg:!h-[1.25vw]'}
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="#F9F8F4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTriggerChevron.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-[20vw] min-w-[6.667vw] overflow-hidden rounded-[2.353vw] lg:!rounded-[0.521vw] bg-bg-grey font-plexsans text-[3.765vw] lg:!text-[0.833vw] text-foreground leading-[110%] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-[0.417vw] data-[side=left]:slide-in-from-right-[0.417vw] data-[side=right]:slide-in-from-left-[0.417vw] data-[side=top]:slide-in-from-bottom-[0.417vw]',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-[0.208vw] data-[side=left]:-translate-x-[0.208vw] data-[side=right]:translate-x-[0.208vw] data-[side=top]:-translate-y-[0.208vw]',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-[2.353vw] lg:!p-[0.521vw]',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'font-plexsans text-[3.765vw] lg:!text-[0.833vw] text-foreground leading-[110%] pl-[1.176vw] lg:!pl-[0.26vw] py-[3.529vw] lg:!py-[0.781vw] pr-[3.529vw] lg:!pr-[0.781vw]',
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'hover:bg-[#373737] relative flex w-full cursor-default select-none items-center rounded-[1.176vw] lg:!rounded-[0.26vw] font-plexsans text-[3.765vw] lg:!text-[0.833vw] text-foreground leading-[110%] pl-[1.176vw] lg:!pl-[0.26vw] pr-[1.647vw] lg:!pr-[0.365vw] py-[1.647vw] lg:!py-[0.365vw] mb-[1.176vw] lg:!mb-[0.26vw] last:mb-0 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-[0.208vw] my-[0.208vw] h-px bg-[#252525]', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTriggerPick,
  SelectTriggerChevron,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
