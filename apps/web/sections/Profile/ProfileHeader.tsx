'use client';

import Image from 'next/image';
import { useState } from 'react';
import { api } from '../../trpc/react';
import { formatAddress } from '@zknoid/sdk/lib/helpers';
import { useNotificationStore } from '@zknoid/sdk/components/shared/Notification/lib/notificationStore';
import minaIMG from '../../public/image/tokens/mina.svg';
import { useMinaBalancesStore } from '@zknoid/sdk/lib/stores/minaBalances';
import { formatUnits } from '@zknoid/sdk/lib/unit';

export function ProfileHeader({
  account,
  onNameChange,
  openAvatarModal,
  avatarId,
  avatarUrl,
}: {
  account?: {
    userAddress: string;
    name?: string;
    avatarId?: number;
  };
  onNameChange: (name: string) => void;
  openAvatarModal: () => void;
  avatarId: number;
  avatarUrl: string;
}) {
  const balanceStore = useMinaBalancesStore();
  const notificationStore = useNotificationStore();

  const [isEditing, setIsEditing] = useState(false);
  const mutation = api.http.accounts.setName.useMutation();

  const handleSubmit = (name: string) => {
    if (!account?.userAddress || name === account.name) return;
    onNameChange(name);
    mutation.mutate({
      userAddress: account.userAddress,
      name,
    });
    setIsEditing(false);
  };

  return (
    <section className="flex flex-row gap-[0.781vw]">
      <button
        onClick={openAvatarModal}
        className={
          'hover:opacity-80 cursor-pointer w-[15.104vw] h-[15.104vw] overflow-hidden rounded-[0.521vw] flex flex-col justify-center item-center'
        }
      >
        <Image
          src={
            avatarUrl
              ? avatarUrl
              : avatarId !== 0
                ? `https://res.cloudinary.com/dw4kivbv0/image/upload/f_auto,q_auto/v1/store/avatars/${avatarId}`
                : 'https://res.cloudinary.com/dw4kivbv0/image/upload/f_auto,q_auto/v1/store/avatars/unset'
          }
          alt="Profile Image"
          width={300}
          height={300}
        />
      </button>
      <div className="flex flex-col gap-[0.521vw]">
        <div className="flex flex-row items-center gap-[0.521vw]">
          {isEditing ? (
            <input
              type="text"
              defaultValue={account?.name || ''}
              className="bg-transparent text-[1.667vw] font-museo font-medium text-foreground border-b border-transparent focus:border-foreground focus:outline-none"
              autoFocus
              onBlur={e => {
                handleSubmit(e.target.value);
                setIsEditing(false);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e.currentTarget.value);
                  setIsEditing(false);
                }
                if (e.key === 'Escape') {
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <span
              onClick={() => setIsEditing(true)}
              className="text-[1.667vw] font-museo font-medium text-foreground cursor-pointer hover:opacity-80"
            >
              {account?.name || 'Unset'}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-[0.260vw]">
          <span className="text-[0.833vw] font-plexsans leading-[110%] text-foreground">
            Wallet Address
          </span>
          <div className="flex flex-row items-center gap-[0.781vw]">
            <div className="flex flex-row items-center justify-start p-[0.781vw] bg-[#373737] rounded-[0.26vw] w-[15.104vw]">
              <span className="text-[0.938vw] font-plexsans leading-[110%] text-foreground">
                {formatAddress(account?.userAddress) || 'Not Connected'}
              </span>
            </div>
            <div className="flex flex-row items-center justify-center gap-[0.521vw] h-full hover:opacity-80 cursor-pointer">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(account?.userAddress || '');
                  notificationStore.create({
                    message: 'Copied to clipboard',
                    type: 'success',
                  });
                }}
                className="h-full px-[0.781vw] rounded-[0.26vw] bg-[#B58BE5] flex flex-row items-center justify-center gap-[0.26vw] text-[0.833vw] font-museo font-medium text-[#212121]"
              >
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[0.833vw] h-[0.833vw]"
                >
                  <path
                    d="M9.275 16.1992C10.3023 16.198 11.2872 15.7893 12.0137 15.0629C12.7401 14.3365 13.1488 13.3516 13.15 12.3242V5.53756C13.1512 5.13019 13.0715 4.72663 12.9156 4.35027C12.7597 3.97392 12.5306 3.63225 12.2417 3.34508L10.5042 1.60753C10.217 1.31859 9.87532 1.08952 9.49896 0.933608C9.12261 0.777691 8.71905 0.698027 8.31168 0.699232H4.625C3.59766 0.700463 2.61276 1.10912 1.88632 1.83555C1.15988 2.56199 0.751231 3.5469 0.75 4.57423V12.3242C0.751231 13.3516 1.15988 14.3365 1.88632 15.0629C2.61276 15.7893 3.59766 16.198 4.625 16.1992H9.275ZM2.3 12.3242V4.57423C2.3 3.9576 2.54495 3.36623 2.98098 2.93021C3.417 2.49419 4.00837 2.24923 4.625 2.24923C4.625 2.24923 8.43723 2.26008 8.5 2.26783V3.79923C8.5 4.21032 8.6633 4.60457 8.95399 4.89525C9.24467 5.18593 9.63892 5.34923 10.05 5.34923H11.5814C11.5892 5.41201 11.6 12.3242 11.6 12.3242C11.6 12.9409 11.355 13.5322 10.919 13.9683C10.483 14.4043 9.89163 14.6492 9.275 14.6492H4.625C4.00837 14.6492 3.417 14.4043 2.98098 13.9683C2.54495 13.5322 2.3 12.9409 2.3 12.3242ZM16.25 6.89923V15.4242C16.2488 16.4516 15.8401 17.4365 15.1137 18.1629C14.3872 18.8894 13.4023 19.298 12.375 19.2992H5.4C5.19446 19.2992 4.99733 19.2176 4.85199 19.0722C4.70665 18.9269 4.625 18.7298 4.625 18.5242C4.625 18.3187 4.70665 18.1216 4.85199 17.9762C4.99733 17.8309 5.19446 17.7492 5.4 17.7492H12.375C12.9916 17.7492 13.583 17.5043 14.019 17.0683C14.455 16.6322 14.7 16.0409 14.7 15.4242V6.89923C14.7 6.69369 14.7817 6.49657 14.927 6.35122C15.0723 6.20588 15.2695 6.12423 15.475 6.12423C15.6805 6.12423 15.8777 6.20588 16.023 6.35122C16.1684 6.49657 16.25 6.69369 16.25 6.89923Z"
                    fill="#212121"
                  />
                </svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[0.260vw] mt-[0.781vw]">
          <span className="text-[0.833vw] font-plexsans leading-[110%] text-foreground">
            Balance
          </span>
          <div className="flex flex-row items-center gap-[0.781vw]">
            <div className="flex flex-row items-center justify-start gap-[0.521vw] p-[0.781vw] bg-[#373737] rounded-[0.26vw] w-[15.104vw]">
              <Image src={minaIMG} alt="Mina" className={'w-[0.938vw] h-[0.938vw]'} />
              <span className="text-[0.938vw] font-plexsans leading-[110%] text-foreground">
                {account?.userAddress
                  ? balanceStore.balances[account?.userAddress]
                    ? formatUnits(balanceStore.balances[account?.userAddress], 9, 2)
                    : 0
                  : 0}{' '}
                MINA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
