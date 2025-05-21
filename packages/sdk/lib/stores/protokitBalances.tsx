'use client';

import 'reflect-metadata';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface BalancesState {
  loading: boolean;
  balances: {
    // address - balance
    [key: string]: bigint;
  };
  loadBalance: (address: string, balance: bigint) => Promise<void>;
}

export const useProtokitBalancesStore = create<BalancesState, [['zustand/immer', never]]>(
  immer(set => ({
    loading: Boolean(false),
    balances: {},
    async loadBalance(address: string, balance: bigint) {
      set(state => {
        state.loading = true;
      });

      console.log('Mina balance fetching', balance);

      set(state => {
        state.loading = false;
        state.balances[address] = balance ?? 0n;
      });
    },
  }))
);
