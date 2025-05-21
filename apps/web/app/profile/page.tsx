'use client';

import { useEffect, useState } from 'react';
import { api } from '../../trpc/react';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import { Tab } from '../../sections/Profile/lib';
import { Stats } from '../../sections/Profile/Stats';
import { LotteryStats } from '../../sections/Profile/LotteryStats';
import { ProfileHeader } from '../../sections/Profile/ProfileHeader';
import { Tabs } from '../../sections/Profile/Tabs';
import { Transactions } from '../../sections/Profile/Transactions';
import ChangeAvatarModal from '../../sections/Profile/ChangeAvatarModal';

export default function ProfilePage() {
  const networkStore = useNetworkStore();
  const accountQuery = api.http.accounts.getAccount.useQuery({
    userAddress: networkStore.address || '',
  });
  const [account, setAccount] = useState<
    { userAddress: string; name?: string; avatarId?: number; avatarUrl?: string } | undefined
  >(undefined);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Stats);
  const [changeAvatarModal, setChangeAvatarModal] = useState<boolean>();
  const [currentAvatarId, setCurrentAvatarId] = useState<number>(account?.avatarId || 0);

  useEffect(() => {
    const data = accountQuery.data?.account;
    setAccount(
      data
        ? {
            userAddress: data.userAddress,
            ...(data.name && { name: data.name }),
            ...(data.avatarId && { avatarId: data.avatarId }),
            ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
          }
        : {
            userAddress: networkStore.address || '',
          }
    );
  }, [accountQuery.data]);

  useEffect(() => {
    if (!account?.avatarId) return;
    if (currentAvatarId != account.avatarId) setCurrentAvatarId(account.avatarId);
  }, [account, accountQuery.data]);

  const handleNameChange = (name: string) => {
    if (!account) return;
    setAccount({
      ...account,
      name,
    });
  };

  return (
    <div className="mx-[18.542vw] flex flex-col mt-[3.125vw]">
      <ProfileHeader
        account={account}
        onNameChange={handleNameChange}
        openAvatarModal={() => setChangeAvatarModal(true)}
        avatarId={currentAvatarId}
        avatarUrl={account?.avatarUrl || ''}
      />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === Tab.Stats && <Stats />}
      {activeTab === Tab.Lottery && <LotteryStats />}
      {activeTab === Tab.Transactions && <Transactions />}
      {changeAvatarModal && (
        <ChangeAvatarModal
          currentAvatarId={currentAvatarId}
          onClose={newAvatarId => {
            if (newAvatarId) setCurrentAvatarId(newAvatarId);
            setChangeAvatarModal(false);
          }}
        />
      )}
    </div>
  );
}
