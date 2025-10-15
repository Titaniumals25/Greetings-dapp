const { ethers } = require("ethers");

async function createWallet() {
  // Create a new random wallet
  const wallet = ethers.Wallet.createRandom();
  
  console.log("🔐 New Wallet Created!");
  console.log("=====================");
  console.log("Address:    ", wallet.address);
  console.log("Private Key:", wallet.privateKey);
  console.log("Mnemonic:   ", wallet.mnemonic.phrase);
  console.log("\n⚠️  IMPORTANT: Save this information in a secure location! ⚠️");
  console.log("⚠️  Never commit your private key or mnemonic to version control! ⚠️");
  
  return wallet;
}

createWallet()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
