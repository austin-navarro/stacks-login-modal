export enum AddressPurpose {
  Payment = 'payment',
  Ordinals = 'ordinals',
  Stacks = 'stacks'
}

export interface WalletAddress {
  address: string;
  publicKey: string;
  purpose: AddressPurpose;
}

export interface WalletState {
  isConnected: boolean;
  addresses: WalletAddress[];
  error: string | null;
}

export enum RpcErrorCode {
  USER_REJECTION = 4001,
  UNAUTHORIZED = 4100,
  UNSUPPORTED_METHOD = 4200,
  DISCONNECTED = 4900,
  CHAIN_DISCONNECTED = 4901
}