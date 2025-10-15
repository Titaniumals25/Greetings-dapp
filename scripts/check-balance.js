const { ethers } = require("hardhat");

async function main() {
  // Get the signer (account) that will be used for deployment
  const [deployer] = await ethers.getSigners();
  
  console.log("Checking balance for account:", deployer.address);
  
  // Get the balance in wei
  const balance = await ethers.provider.getBalance(deployer.address);
  
  // Convert balance from wei to ETH
  const balanceInEth = ethers.formatEther(balance);
  
  console.log(`Account balance: ${balanceInEth} ETH`);
  
  if (parseFloat(balanceInEth) === 0) {
    console.log("\nYou don't have any test ETH. You can get some from a Base Sepolia faucet:");
    console.log("1. https://sepoliafaucet.com/");
    console.log("2. https://www.alchemy.com/faucets/ethereum-sepolia");
    console.log("3. https://www.infura.io/faucet/sepolia");
    console.log("\nMake sure to switch the network to Base Sepolia (Chain ID: 84532) in your wallet before requesting test ETH.");
  } else if (parseFloat(balanceInEth) < 0.01) {
    console.log("\nYou have some test ETH, but you might want to get more from a faucet.");
  } else {
    console.log("\nYou have enough test ETH to deploy your contract!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
