import { useState, useCallback, useEffect } from 'react';
import { request } from 'sats-connect';
import type { WalletState, WalletAddress, AddressPurpose, RpcErrorCode } from '../types/wallet';
import { getXverseProvider } from '../utils/providers';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    addresses: [],
    error: null,
  });

  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    try {
      const xverseProvider = getXverseProvider();
      setProvider(xverseProvider);
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        error: (error as Error).message,
      }));
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!provider) {
      setWalletState(prev => ({
        ...prev,
        error: 'Xverse wallet not found. Please install Xverse wallet extension.',
      }));
      return;
    }

    try {
      const response = await request('wallet_connect', null);
      
      if (response.status === 'success') {
        const addresses = response.result.addresses.map((addr: any) => ({
          address: addr.address,
          publicKey: addr.publicKey,
          purpose: addr.purpose as AddressPurpose,
        }));

        setWalletState({
          isConnected: true,
          addresses,
          error: null,
        });
      } else {
        if (response.error.code === RpcErrorCode.USER_REJECTION) {
          setWalletState(prev => ({
            ...prev,
            error: 'Connection request was rejected by user',
          }));
        } else {
          setWalletState(prev => ({
            ...prev,
            error: response.error.message || 'Failed to connect wallet',
          }));
        }
      }
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        error: (error as Error).message || 'Failed to connect wallet',
      }));
    }
  }, [provider]);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      addresses: [],
      error: null,
    });
  }, []);

  const getAddressByPurpose = useCallback((purpose: AddressPurpose) => {
    return walletState.addresses.find(addr => addr.purpose === purpose);
  }, [walletState.addresses]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    hasProvider: !!provider,
    getAddressByPurpose,
  };
};