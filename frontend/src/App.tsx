import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChakraProvider, 
  Box, 
  Button, 
  VStack, 
  Text, 
  Input, 
  Container, 
  Heading, 
  useToast,
  Link
} from '@chakra-ui/react';
import { Web3Provider } from './contexts/Web3Context';
import { useWeb3 } from './contexts/Web3Context';
import { ethers } from 'ethers';
import { greeterABI, greeterAddress, GreeterContract } from './config';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const GreeterInterface: React.FC = () => {
  const { provider, signer, account, isConnected, connectWallet, chainId } = useWeb3();
  const [greeting, setGreeting] = useState('');
  const [currentGreeting, setCurrentGreeting] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Initialize contract
  const getContract = useCallback(() => {
    if (!signer) return null;
    return new ethers.Contract(greeterAddress, greeterABI, signer) as GreeterContract;
  }, [signer]);

  // Fetch current greeting
  const fetchGreeting = useCallback(async () => {
    if (!provider) return;
    
    try {
      const contract = new ethers.Contract(greeterAddress, greeterABI, provider) as GreeterContract;
      const greeting = await contract.greet();
      setCurrentGreeting(greeting);
    } catch (error) {
      console.error('Error fetching greeting:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch greeting',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [provider, toast]);

  // Set new greeting
  const setNewGreeting = useCallback(async () => {
    if (!greeting || !signer) return;
    
    setLoading(true);
    try {
      const contract = getContract();
      if (!contract) throw new Error('Contract not initialized');
      
      const tx = await contract.setGreeting(greeting);
      await tx.wait();
      
      toast({
        title: 'Success',
        description: 'Greeting updated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Refresh the greeting
      await fetchGreeting();
    } catch (error) {
      console.error('Error setting greeting:', error);
      toast({
        title: 'Error',
        description: 'Failed to update greeting',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [greeting, signer, getContract, fetchGreeting, toast]);

  // Fetch greeting on load and when account changes
  useEffect(() => {
    if (isConnected && provider) {
      fetchGreeting();
    }
  }, [isConnected, provider, fetchGreeting]);

  if (!isConnected) {
    return (
      <Container centerContent mt={10}>
        <VStack spacing={4}>
          <Heading>Welcome to Greeter DApp</Heading>
          <Text>Connect your wallet to interact with the Greeter contract</Text>
          <Button colorScheme="blue" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading textAlign="center">Greeter DApp</Heading>
        
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <VStack spacing={4}>
            <Text fontSize="lg">
              <strong>Connected Account:</strong> {`${account?.substring(0, 6)}...${account?.substring(38)}`}
            </Text>
            <Text fontSize="lg">
              <strong>Network ID:</strong> {chainId}
            </Text>
            <Text fontSize="lg">
              <strong>Contract Address:</strong>{' '}
              <a 
                href={`https://sepolia.basescan.org/address/${greeterAddress}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#3182ce' }}
              >
                {`${greeterAddress.substring(0, 6)}...${greeterAddress.substring(38)}`}
              </a>
            </Text>
          </VStack>
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <VStack spacing={4}>
            <Text fontSize="xl">
              <strong>Current Greeting:</strong> {currentGreeting || 'Loading...'}
            </Text>
            <Button colorScheme="blue" onClick={fetchGreeting} isLoading={loading}>
              Refresh Greeting
            </Button>
          </VStack>
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <VStack spacing={4}>
            <Text fontSize="xl">Set New Greeting</Text>
            <Input
              placeholder="Enter new greeting"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
            />
            <Button 
              colorScheme="green" 
              onClick={setNewGreeting} 
              isLoading={loading}
              isDisabled={!greeting}
            >
              Update Greeting
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Web3Provider>
        <Box minH="100vh" bg="gray.50">
          <GreeterInterface />
        </Box>
      </Web3Provider>
    </ChakraProvider>
  );
};

export default App;
