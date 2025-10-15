const hre = require("hardhat");

async function main() {
  console.log("Deploying Greeter contract...");
  
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Base!");
  
  await greeter.waitForDeployment();
  
  console.log(`Greeter deployed to: ${await greeter.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
