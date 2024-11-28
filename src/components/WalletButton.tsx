import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletButtonProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  disabled?: boolean;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
  disabled = false,
}) => {
  return (
    <button
      onClick={isConnected ? onDisconnect : onConnect}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-orange-500 hover:bg-orange-600 text-white'
      }`}
    >
      <Wallet className="w-5 h-5" />
      <span>{isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}</span>
    </button>
  );
};