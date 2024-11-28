import React from 'react';
import { Copy } from 'lucide-react';
import { WalletAddress, AddressPurpose } from '../types/wallet';

interface WalletInfoProps {
  addresses: WalletAddress[];
}

const AddressDisplay: React.FC<{ address: WalletAddress }> = ({ address }) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address.address);
  };

  const getPurposeLabel = (purpose: AddressPurpose) => {
    switch (purpose) {
      case AddressPurpose.Payment:
        return 'Payment Address';
      case AddressPurpose.Ordinals:
        return 'Ordinals Address';
      case AddressPurpose.Stacks:
        return 'Stacks Address';
      default:
        return 'Unknown Address';
    }
  };

  return (
    <div className="mb-4 last:mb-0">
      <h3 className="text-sm font-medium text-gray-500 mb-1">
        {getPurposeLabel(address.purpose)}
      </h3>
      <div className="flex items-center gap-2">
        <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1 overflow-hidden text-ellipsis">
          {address.address}
        </code>
        <button
          onClick={copyAddress}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          title="Copy address"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const WalletInfo: React.FC<WalletInfoProps> = ({ addresses }) => {
  if (!addresses.length) return null;

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Wallet Details</h2>
      {addresses.map((address) => (
        <AddressDisplay key={address.address} address={address} />
      ))}
    </div>
  );
};