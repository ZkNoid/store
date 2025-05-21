import { AnimatePresence, motion } from 'framer-motion';
import avatarUnset from '../../public/image/avatars/avatar-unset.svg';
import avatar1 from '../../public/image/avatars/avatar-1.svg';
import avatar2 from '../../public/image/avatars/avatar-2.svg';
import avatar3 from '../../public/image/avatars/avatar-3.svg';
import avatar4 from '../../public/image/avatars/avatar-4.svg';
import avatar5 from '../../public/image/avatars/avatar-5.svg';
import avatar6 from '../../public/image/avatars/avatar-6.svg';
import avatar7 from '../../public/image/avatars/avatar-7.svg';
import avatar8 from '../../public/image/avatars/avatar-8.svg';
import avatar9 from '../../public/image/avatars/avatar-9.svg';
import avatar10 from '../../public/image/avatars/avatar-10.svg';
import avatar11 from '../../public/image/avatars/avatar-11.svg';
import avatar12 from '../../public/image/avatars/avatar-12.svg';
import avatar13 from '../../public/image/avatars/avatar-13.svg';
import avatar14 from '../../public/image/avatars/avatar-14.svg';
import avatar15 from '../../public/image/avatars/avatar-15.svg';
import avatar16 from '../../public/image/avatars/avatar-16.svg';
import avatar17 from '../../public/image/avatars/avatar-17.svg';
import avatar18 from '../../public/image/avatars/avatar-18.svg';
import avatar19 from '../../public/image/avatars/avatar-19.svg';
import avatar20 from '../../public/image/avatars/avatar-20.svg';
import avatar21 from '../../public/image/avatars/avatar-21.svg';
import Image from 'next/image';
import { api } from '../../trpc/react';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import { useNotificationStore } from '@zknoid/sdk/components/shared/Notification/lib/notificationStore';
import { useContext, useEffect, useState } from 'react';
import SetupStoreContext from '../../../../packages/sdk/lib/contexts/SetupStoreContext';
const zknoidAvatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20,
  avatar21,
];

const NoAvatar = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[5.2083vw] h-[5.2083vw]"
    >
      <rect width="100" height="100" rx="10" fill="#121212" />
      <path
        d="M66.4 28H32.8C30.149 28 28 30.149 28 32.8V66.4C28 69.051 30.149 71.2 32.8 71.2H66.4C69.051 71.2 71.2 69.051 71.2 66.4V32.8C71.2 30.149 69.051 28 66.4 28Z"
        stroke="#212121"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M42.4016 47.1996C45.0525 47.1996 47.2016 45.0506 47.2016 42.3996C47.2016 39.7486 45.0525 37.5996 42.4016 37.5996C39.7506 37.5996 37.6016 39.7486 37.6016 42.3996C37.6016 45.0506 39.7506 47.1996 42.4016 47.1996Z"
        stroke="#212121"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M71.2031 56.8001L63.7967 49.3937C62.8966 48.4938 61.6759 47.9883 60.4031 47.9883C59.1303 47.9883 57.9097 48.4938 57.0095 49.3937L35.2031 71.2001"
        stroke="#212121"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default function ChangeAvatarModal({
  onClose,
  currentAvatarId,
}: {
  onClose: (newAvatarId?: number) => void;
  currentAvatarId: number;
}) {
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const networkStore = useNetworkStore();
  const notificationStore = useNotificationStore();
  const { mutate: setAvatarId } = api.http.accounts.setAvatar.useMutation();

  const [avatars, setAvatars] = useState<string[]>(zknoidAvatars);

  const { refetchAccountData } = useContext(SetupStoreContext);

  const { data: nfts } = api.http.nft.getUserNFTs.useQuery(
    {
      address: networkStore.address!,
      page: 0,
      hitsPerPage: 100,
    },
    {
      enabled: !!networkStore.address,
    }
  );

  useEffect(() => {
    console.log('nfts', nfts);
    if (nfts) {
      const nftAvatars = nfts.map(nft => nft.image);
      setAvatars([...avatars, ...nftAvatars]);
    }
  }, [nfts]);

  return (
    <AnimatePresence>
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
            'relative flex flex-col rounded-[0.521vw] bg-[#373737] p-[2.083vw] gap-[0.781vw]'
          }
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-row items-center justify-between">
            <span className="text-[1.667vw] font-museo font-medium">Edit Avatar</span>
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1.302vw] h-[1.302vw] hover:opacity-80 cursor-pointer"
              onClick={() => onClose()}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.5585 14.6799L22.8746 24.996L24.996 22.8746L14.6799 12.5585L24.996 2.24241L22.8746 0.121094L12.5585 10.4372L2.12132 0L0 2.12132L10.4372 12.5585L0 22.9957L2.12132 25.1171L12.5585 14.6799Z"
                fill="#F9F8F4"
              />
            </svg>
          </div>
          <div className="">
            {selectedAvatarId ? (
              <Image
                src={avatars[selectedAvatarId - 1]}
                alt="avatar"
                className="w-[5.2083vw] h-[5.2083vw]"
                width={208}
                height={208}
              />
            ) : (
              <NoAvatar />
            )}
          </div>
          <div className="grid grid-cols-5 gap-[0.26vw]">
            {avatars.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!networkStore.address) return;
                  setSelectedAvatarId(index + 1);

                  // if (currentAvatarId === index + 1) {
                  //   notificationStore.create({
                  //     type: 'error',
                  //     message: 'You already pick this avatar!',
                  //   });
                  //   return;
                  // }
                  // setAvatarId({
                  //   userAddress: networkStore.address,
                  //   avatarId: index + 1,
                  // });
                  // onClose(index + 1);
                  // notificationStore.create({
                  //   type: 'success',
                  //   message: 'Avatar changed!',
                  // });
                }}
                className="hover:opacity-80 cursor-ponter w-[5.208vw] h-[5.208vw] overflow-hidden"
              >
                <Image src={item} alt="avatar" className="w-full h-full" width={208} height={208} />
              </button>
            ))}
          </div>
          <button
            className="w-full h-[2.5vw] bg-[#B58BE5] items-center justify-center"
            onClick={() => {
              if (!networkStore.address) return;
              const avatarId = selectedAvatarId || 0;

              if (avatarId >= zknoidAvatars.length) {
                setAvatarId({
                  userAddress: networkStore.address,
                  avatarId: undefined,
                  avatarUrl: avatars[avatarId - 1],
                });
              } else {
                setAvatarId({
                  userAddress: networkStore.address,
                  avatarId: avatarId,
                  avatarUrl: undefined,
                });
              }
              setTimeout(() => {
                refetchAccountData?.();
              }, 100);
              notificationStore.create({
                type: 'success',
                message: 'Avatar changed!',
              });
              onClose(selectedAvatarId || 0);
            }}
          >
            <span className="text-[#212121]">Save changes</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
