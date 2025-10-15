const hre = require("hardhat");

async function main() {
  await hre.run("verify:verify", {
    address: "0x5e2b3906566b6E711F9b4Df176737dB02D6cB21e",
    constructorArguments: ["Hello, Base!"],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
