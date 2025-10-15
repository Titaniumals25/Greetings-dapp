import { ethers } from 'ethers';

// Contract ABI - This should match your Greeter contract's ABI
export const greeterABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "greet",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "name": "setGreeting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Contract address - The address where your Greeter contract is deployed
export const greeterAddress = "0x5e2b3906566b6E711F9b4Df176737dB02D6cB21e";

// Network configuration
export interface NetworkConfig {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: readonly string[];
  blockExplorerUrls: readonly string[];
}

export const networkConfig: NetworkConfig = {
  chainId: 84532, // Base Sepolia chain ID
  chainName: 'Base Sepolia',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org/'],
} as const;

// Contract interface
export interface GreeterContract extends ethers.Contract {
  greet(): Promise<string>;
  setGreeting(greeting: string): Promise<ethers.ContractTransaction>;
}
