import { http, createConfig } from 'wagmi'
import { mainnet, monadTestnet } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'
import { ApolloClient, InMemoryCache } from "@apollo/client"; 

export const projectId = import.meta.env.VITE_APP_PROJECT_ID
  
export const metadata = {
  name: 'Monad Domains',
  description: ''
}

export const chains = [mainnet, monadTestnet];

export const wagmiConfig = createConfig({
    chains: chains,
    transports: { 
      [mainnet.id]: http(),
      [monadTestnet.id]: http(),
    },
    connectors: [
      walletConnect({ projectId, metadata, showQrModal: true }),
      injected({ shimDisconnect: true }),
      coinbaseWallet({
        appName: metadata.name
      })
    ]
});

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_APP_GRAPHAPI_URL,
  cache: new InMemoryCache()
})
