import { http, createConfig } from 'wagmi'
import { mainnet, goerli, sepolia, zkFair } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'
import { ApolloClient, InMemoryCache } from "@apollo/client"; 

export const projectId = import.meta.env.VITE_APP_PROJECT_ID
  
export const metadata = {
  name: 'Monad Domains',
  description: ''
}

export const chains = [mainnet, sepolia, zkFair];

export const wagmiConfig = createConfig({
    chains: chains,
    transports: { 
      [mainnet.id]: http(),
      [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/"+ import.meta.env.VITE_APP_ALCHEMY_KEY),
      [zkFair.id]: http(),
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
