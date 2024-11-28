import { getProviders, getProviderById } from 'sats-connect';

export const getXverseProviderId = () => {
  const providers = getProviders();
  const xverseProvider = providers.find(provider => 
    provider.name.toLowerCase().includes('xverse')
  );
  
  if (!xverseProvider) {
    throw new Error('Xverse wallet not found. Please install Xverse wallet extension.');
  }
  
  return xverseProvider.id;
};

export const getXverseProvider = () => {
  const providerId = getXverseProviderId();
  return getProviderById(providerId);
};