const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  
  // Connect to the deployed contract
  const greeterAddress = "0x5e2b3906566b6E711F9b4Df176737dB02D6cB21e"; // Your deployed contract address
  const greeter = await Greeter.attach(greeterAddress);
  
  console.log(`Connected to Greeter contract at: ${greeterAddress}`);
  
  // 1. Read the current greeting
  try {
    const currentGreeting = await greeter.greet();
    console.log("Current greeting:", currentGreeting);
  } catch (error) {
    console.error("Error reading greeting:", error.message);
  }
  
  // 2. Set a new greeting (uncomment to use)
  /*
  try {
    const newGreeting = "Hello from Hardhat!";
    console.log(`Setting new greeting to: "${newGreeting}"`);
    const tx = await greeter.setGreeting(newGreeting);
    await tx.wait();
    console.log("Greeting updated successfully!");
    
    // Verify the new greeting
    const updatedGreeting = await greeter.greet();
    console.log("Updated greeting:", updatedGreeting);
  } catch (error) {
    console.error("Error setting greeting:", error.message);
  }
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
