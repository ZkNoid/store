import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function walletInstalled() {
  return typeof (window as any).mina !== 'undefined';
}

export async function requestAccounts() {
  if ((window as any).mina?.isPallad) {
    return await (window as any).mina
      ?.request({ method: 'mina_accounts' })
      .then((resp: any) => resp.result);
  } else {
    return await (window as any).mina?.requestAccounts();
  }
}

export async function sendTransaction(txJson: any) {
  if ((window as any).mina?.isPallad) {
    console.log('Signing', txJson);
    const signResp = await (window as any).mina.request({
      method: 'mina_signTransaction',
      params: {
        transaction: JSON.parse(txJson),
      },
    });

    console.log('Sign resp', signResp);

    const sendResp = await (window as any).mina.request({
      method: 'mina_sendTransaction',
      params: {
        signedTransaction: signResp.result,
        transactionBody: txJson,
        transactionType: 'zkapp',
      },
    });

    console.log('Send resp', sendResp);

    return sendResp.result.hash;
  } else {
    try {
      const { hash } = await (window as any).mina.sendTransaction({
        transaction: txJson,
        feePayer: {
          fee: '0.1',
          memo: '',
        },
      });
      return hash;
    } catch (e: any) {
      if (e?.code == 1001) {
        await requestAccounts();
        return await sendTransaction(txJson);
      }
    }
  }
}

export const formatAddress = (address: string | undefined, visible = 5) =>
  address ? address.slice(0, visible) + '...' + address.slice(-visible) : 'None';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviateNumber(n: number): string {
  // Thresholds and labels (Q - Quadrillion, T - Trillion, etc.)
  const values = [1e15, 1e12, 1e9, 1e6, 1e3];
  const symbols = ['Q', 'T', 'B', 'M', 'K'];

  for (let i = 0; i < values.length; i++) {
    if (n >= values[i]) {
      return (n / values[i]).toFixed(2) + symbols[i];
    }
  }

  // If n is below 1000, just return n as a string
  return n.toString();
}
