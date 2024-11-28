import React from 'react';
import { useProviders } from './hooks/useProviders';
import { useWallet } from './hooks/useWallet';
import { WalletButton } from './components/WalletButton';
import { WalletInfo } from './components/WalletInfo';
import { ProviderList } from './components/ProviderList';
import { Bitcoin } from 'lucide-react';

function App() {
  const {
    providers,
    selectedProvider,
    isLoading,
    error: providerError,
    selectProvider,
  } = useProviders();

  const {
    isConnected,
    addresses,
    error: walletError,
    connectWallet,
    disconnectWallet,
    hasProvider,
  } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold">Bitcoin Connect</span>
            </div>
            <WalletButton
              isConnected={isConnected}
              onConnect={connectWallet}
              onDisconnect={disconnectWallet}
              disabled={!hasProvider}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(providerError || walletError) && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {providerError || walletError}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Detecting wallet providers...</p>
          </div>
        ) : !isConnected ? (
          <div className="space-y-8">
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Connect Your Bitcoin Wallet
              </h1>
              <p className="text-gray-600 mb-8">
                Select your preferred wallet provider to get started
              </p>
            </div>
            <ProviderList
              providers={providers}
              selectedProvider={selectedProvider}
              onSelectProvider={selectProvider}
            />
            {!providers.length && (
              <div className="text-center">
                <a
                  href="https://www.xverse.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 underline"
                >
                  Install Xverse Wallet
                </a>
              </div>
            )}
          </div>
        ) : (
          <WalletInfo addresses={addresses} />
        )}
      </main>
    </div>
  );
}

export default App;