import React from 'react';

import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { Chain } from 'viem';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

const truffle: Chain = {
  id: 1337,
  name: 'Truffle',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: ["http://localhost:9545"] },
    default: { http: ["http://localhost:9545"] },
  },
  testnet: true
}

const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [truffle, mainnet, polygon, arbitrum, optimism, sepolia, base],
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
