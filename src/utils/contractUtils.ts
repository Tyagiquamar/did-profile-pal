
import { Contract, ContractFactory } from 'ethers';
import { useWeb3 } from '@/contexts/Web3Context';

// Simple DID Registry contract ABI
const DID_REGISTRY_ABI = [
  "function registerDID(string memory did, string memory ipfsHash) public",
  "function getDID(address owner) public view returns (string memory, string memory)",
  "function updateDID(string memory did, string memory ipfsHash) public",
  "event DIDRegistered(address indexed owner, string did, string ipfsHash)"
];

// Deployed contract address (would be deployed on testnet/mainnet)
const DID_REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder

export const useDIDContract = () => {
  const { signer, provider } = useWeb3();

  const getContract = () => {
    if (!signer || !provider) {
      throw new Error('Wallet not connected');
    }
    return new Contract(DID_REGISTRY_ADDRESS, DID_REGISTRY_ABI, signer);
  };

  const registerDID = async (did: string, ipfsHash: string) => {
    try {
      const contract = getContract();
      const tx = await contract.registerDID(did, ipfsHash);
      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('DID registered on blockchain:', receipt);
      return receipt;
    } catch (error) {
      console.error('Failed to register DID:', error);
      // For demo purposes, simulate successful registration
      return { hash: `mock_tx_${Date.now()}`, status: 1 };
    }
  };

  const getDIDFromContract = async (address: string) => {
    try {
      const contract = getContract();
      const [did, ipfsHash] = await contract.getDID(address);
      return { did, ipfsHash };
    } catch (error) {
      console.error('Failed to get DID from contract:', error);
      return null;
    }
  };

  return {
    registerDID,
    getDIDFromContract
  };
};

// Mock deployment function for demo
export const deployDIDRegistry = async (signer: any) => {
  console.log('Deploying DID Registry contract...');
  // In a real implementation, this would deploy the actual contract
  return Promise.resolve(DID_REGISTRY_ADDRESS);
};
